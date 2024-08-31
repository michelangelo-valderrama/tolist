import { expect, describe, it, vi, afterEach } from 'vitest'
import * as usersService from '../../../src/api/users/service'
import * as projectsService from '../../../src/api/projects/service'
import * as usersSchemas from '../../../src/api/users/schemas'
import { hashPassword } from '../../../src/utils/auth'
import { createUser } from '../../__test-data__/users'

const RANDOM_OBJECT_ID = '507f1f77bcf86cd799439011'

describe('User service test', () => {
  describe('add user', async () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('correct user creation', async () => {
      const addInboxProjectMock = vi.spyOn(projectsService, 'addInboxProject')

      const userData: usersSchemas.UserCreate = {
        hashed_password: hashPassword('123456'),
        email: 'user@mail.com',
        name: 'User'
      }

      const userCreated = await usersService.addUser(userData)

      // inbox proyect creation
      expect(addInboxProjectMock).toBeCalledTimes(1)

      const userRetrieved = await usersService.getUser(userCreated.id)

      expect(userRetrieved).toBeTypeOf('object')
      expect(userRetrieved.name).toBe(userData.name)
      expect(userRetrieved.email).toBe(userData.email)
      expect(userRetrieved.hashed_password).toBe(userData.hashed_password)
    })

    it('reject user with same name', async () => {
      await createUser({ name: 'username' })

      let createUserError: any

      try {
        await createUser({ name: 'username' })
        createUserError
      } catch (error) {
        createUserError = error
      }

      expect(createUserError).toBeTypeOf('object')
      expect(createUserError).toHaveProperty('errorResponse')
      expect(createUserError.errorResponse).toStrictEqual({
        index: 0,
        code: 11000,
        errmsg:
          'E11000 duplicate key error collection: test.users index: name_1 dup key: { name: "username" }',
        keyPattern: { name: 1 },
        keyValue: { name: 'username' }
      })
    })

    it('reject user with same email', async () => {
      await createUser({ email: 'user01@example.com' })

      let createUserError: any

      try {
        await createUser({ email: 'user01@example.com' })
        createUserError
      } catch (error) {
        createUserError = error
      }

      expect(createUserError).toBeTypeOf('object')
      expect(createUserError).toHaveProperty('errorResponse')
      expect(createUserError.errorResponse).toStrictEqual({
        index: 0,
        code: 11000,
        errmsg:
          'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "user01@example.com" }',
        keyPattern: { email: 1 },
        keyValue: { email: 'user01@example.com' }
      })
    })
  })

  describe('find user', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('get user', async () => {
      const user = await createUser({ name: 'username' })

      const userGetter = await usersService.getUser(user.id)
      expect(userGetter).toEqual(user)
    })

    it('user not found', async () => {
      expect(usersService.getUser(RANDOM_OBJECT_ID)).rejects.toThrow(
        'User not found'
      )
    })

    it('find by name', async () => {
      const user = await createUser({ name: 'username' })

      expect(await usersService.findByName(user.name)).toEqual(user)
    })

    it('not found by name', async () => {
      expect(usersService.findByName('invalid')).rejects.toThrow(
        "User 'invalid' not found."
      )
    })

    it('not found by email', async () => {
      expect(usersService.findByEmail('invalid')).rejects.toThrow(
        "User with email 'invalid' not found."
      )
    })
  })

  describe('user exists', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('error if user name already exists', async () => {
      const user = await createUser()

      expect(usersService.userExists(user.name, user.email)).rejects.toThrow(
        `User name '${user.name}' already exists`
      )
    })

    it('error if user email already exists', async () => {
      const user = await createUser()

      expect(usersService.userExists('random', user.email)).rejects.toThrow(
        `User email '${user.email}' already exists`
      )
    })

    it('user not exists', async () => {
      expect(
        await usersService.userExists('random', 'mail@example.com')
      ).toBeUndefined()
    })
  })

  describe('update user', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('update secret', async () => {
      const user = await createUser()

      const userUpdated = await usersService.updateSecret(user.id, 'secret')
      expect(userUpdated.secret).toBe('secret')
      expect(userUpdated.updated_at).not.toBe(user.updated_at)
    })

    it('update secret not user found', async () => {
      expect(
        usersService.updateSecret(RANDOM_OBJECT_ID, 'secret')
      ).rejects.toThrow('User not found')
    })
  })
})
