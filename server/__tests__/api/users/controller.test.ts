import { expect, describe, it } from 'vitest'
import request from 'supertest'
import app from '../../../src/app'
import * as usersSchemas from '../../../src/api/users/schemas'
import HTTP_STATUS from '../../../src/constants/http-status'
import UserModel from '../../../src/api/users/model'

const mockApp = request(app)

const newUser: usersSchemas.UserCreatePublic = {
  email: 'user@mail.com',
  password: '123456',
  name: 'NewUser'
}

describe('User controller test', () => {
  describe('signup', async () => {
    it('correct signup', async () => {
      const res = await mockApp
        .post('/users/signup')
        .send(newUser)
        .expect(HTTP_STATUS.CREATED_201)

      const { data: userData } = res.body

      expect(userData).toHaveProperty('id')
      expect(userData).toHaveProperty('updated_at')
      expect(userData).toHaveProperty('created_at')

      expect(userData.name).toBe(newUser.name)
      expect(userData.email).toBe(newUser.email)

      expect(userData).not.toHaveProperty('password')
      expect(userData).not.toHaveProperty('hashed_password')
      expect(userData).not.toHaveProperty('secret')
    })

    it('reject invalid data', async () => {
      await mockApp
        .post('/users/signup')
        .send({
          name: 12,
          mail: 'mail@gmail.com',
          password: '123'
        })
        .expect(HTTP_STATUS.BAD_REQUEST_400)
    })

    it('reject user with duplicate name', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const res = await mockApp
        .post('/users/signup')
        .send({
          name: newUser.name,
          email: 'user2@email.com',
          password: '123456'
        })
        .expect(HTTP_STATUS.CONFLICT_409)

      expect(res.body.message).toBe(
        `User name '${newUser.name}' already exists.`
      )
    })

    it('reject user with duplicate email', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const res = await mockApp
        .post('/users/signup')
        .send({
          name: 'User',
          email: newUser.email,
          password: '123456'
        })
        .expect(HTTP_STATUS.CONFLICT_409)

      expect(res.body.message).toBe(
        `User email '${newUser.email}' already exists.`
      )
    })
  })

  describe('login', async () => {
    it('correct login', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const userLoginData: usersSchemas.userLoginSchema = {
        password: newUser.password,
        name: newUser.name
      }

      const res = await mockApp
        .post('/users/login')
        .send(userLoginData)
        .expect('Set-Cookie', /refreshToken/)
        .expect(HTTP_STATUS.OK_200)

      const { data: authData } = res.body

      expect(authData.accessToken).toBeTypeOf('string')
    })

    it('retrive user', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const loginRes = await mockApp.post('/users/login').send({
        password: newUser.password,
        name: newUser.name
      })

      const { data: authData } = loginRes.body

      const getMeRes = await mockApp
        .get('/users/me')
        .set({
          Authorization: 'Bearer ' + authData.accessToken
        })
        .expect(HTTP_STATUS.OK_200)

      const { data: userData } = getMeRes.body

      expect(getMeRes.body.message).toBe('User retrieved')
      expect(userData.name).toBe(newUser.name)
    })
  })

  describe('token', () => {
    it('correct refresh token', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const loginRes = await mockApp.post('/users/login').send({
        password: newUser.password,
        name: newUser.name
      })

      const { data: authData } = loginRes.body

      const refreshRes = await mockApp
        .post('/users/refresh')
        .set({
          Authorization: 'Bearer ' + authData.accessToken,
          Cookie: loginRes.get('Set-Cookie')
        })
        .expect('Set-Cookie', /refreshToken/)
        .expect(HTTP_STATUS.OK_200)

      const { data: refreshData } = refreshRes.body

      expect(refreshData.accessToken).toBeTypeOf('string')

      // with invalid tokens
      await mockApp
        .get('/users/me')
        .set({
          Authorization: 'Bearer ' + authData.accessToken,
          Cookie: loginRes.get('Set-Cookie') // <- invalid refresh token
        })
        .expect(HTTP_STATUS.UNAUTHORIZED_401)

      // with valid tokens
      await mockApp
        .get('/users/me')
        .set({
          Authorization: 'Bearer ' + refreshData.accessToken,
          Cookie: refreshRes.get('Set-Cookie')
        })
        .expect(HTTP_STATUS.OK_200)
    })

    it('no refresh token provided', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const loginRes = await mockApp.post('/users/login').send({
        password: newUser.password,
        name: newUser.name
      })

      const { data: authData } = loginRes.body

      const refreshRes = await mockApp
        .post('/users/refresh')
        .set({
          Authorization: 'Bearer ' + authData.accessToken
        })
        .expect(HTTP_STATUS.BAD_REQUEST_400)

      expect(refreshRes.body.message).toBe('No refresh token provided.')
    })

    it('user not found', async () => {
      await mockApp.post('/users/signup').send(newUser)

      const loginRes = await mockApp.post('/users/login').send({
        password: newUser.password,
        name: newUser.name
      })

      const { data: authData } = loginRes.body

      await UserModel.deleteMany().lean().exec()

      const refreshRes = await mockApp
        .post('/users/refresh')
        .set({
          Authorization: 'Bearer ' + authData.accessToken,
          Cookie: loginRes.get('Set-Cookie')
        })
        .expect(HTTP_STATUS.NOT_FOUND_404)

      expect(refreshRes.body.message).toBe('User not found.')
    })
  })
})
