import { ObjectId } from 'mongodb'
import * as usersService from '../../src/api/users/service'
import * as usersSchemas from '../../src/api/users/schemas'
import { hashPassword } from '../../src/utils/auth'

export async function createUser(user?: Partial<usersSchemas.UserCreate>) {
  const randomId = new ObjectId()

  const userCreated = await usersService.addUser({
    name: 'user' + randomId,
    email: randomId + '@mail.com',
    hashed_password: hashPassword('123456'),
    ...user
  })

  return userCreated
}
