import HTTP_STATUS from '../../constants/http-status'
import { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import { comparePassword, createAccessToken } from '../../utils/auth'
import ApiError from '../../utils/error'
import { User } from './schemas'
import * as usersService from './service'

export async function getMe(req: ApiTypes.Request): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id
	const user = await usersService.getUser(userId)
	return new ApiResponse('User retreived', User.public(user))
}

export async function singup(req: ApiTypes.Request): Promise<ApiResponse> {
	const user = await usersService.addUser(req.body)
	return new ApiResponse(
		'User created successfully',
		User.public(user),
		HTTP_STATUS.CREATED_201
	)
}

export async function login(req: ApiTypes.Request): Promise<ApiResponse> {
	const { password, email } = req.body

	const user = await usersService.findByEmail(email)

	const validPassword = comparePassword(password, user.hashedPassword)
	if (!validPassword) {
		throw new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Incorrect password')
	}

	const accessToken = createAccessToken(user.id)

	return new ApiResponse('User successfully logged in', {
		user: User.public(user),
		accessToken
	})
}
