import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import * as projectsService from '../projects/service'
import UserModel from './model'
import { User, UserCreate } from './schemas'

export async function getUser(
  userId: string,
  q?: Partial<User>
): Promise<User> {
  const user = await UserModel.findOne({ _id: userId, ...q })
    .lean()
    .exec()
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'User not found')
  }
  return User.new(user)
}

export async function addUser(userCreate: UserCreate): Promise<User> {
  const user = await UserModel.create(userCreate)
  projectsService.addInboxProject(`${user._id}`)
  return User.new(user)
}

export async function findByName(name: string): Promise<User> {
  const user = await UserModel.findOne({
    name
  })
    .lean()
    .exec()
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, `User '${name}' not found`)
  }
  return User.new(user)
}

export async function findByEmail(email: string): Promise<User> {
  const user = await UserModel.findOne({
    email
  })
    .lean()
    .exec()
  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND_404,
      `User with email '${email}' not found`
    )
  }
  return User.new(user)
}

export async function userExists(name: string, email: string): Promise<void> {
  const nameExists = await UserModel.findOne({ name }).countDocuments().exec()
  if (nameExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT_409,
      `User name '${name}' already exists`
    )
  }
  const emailExists = await UserModel.findOne({ email }).countDocuments().exec()
  if (emailExists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT_409,
      `User email '${email}' already exists`
    )
  }
}

export async function updateSecret(
  userId: string,
  secret: string
): Promise<User> {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { secret },
    { new: true }
  )
    .lean()
    .exec()
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'User not found')
  }
  return User.new(user)
}
