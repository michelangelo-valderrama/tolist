import {
  expect,
  describe,
  it,
  vi,
  afterEach,
  beforeAll,
  beforeEach
} from 'vitest'
import request from 'supertest'
import { ObjectId } from 'mongodb'
import app from '../../../src/app'
import * as projectsSchemas from '../../../src/api/projects/schemas'
import * as projectsService from '../../../src/api/projects/service'
import HTTP_STATUS from '../../../src/constants/http-status'
import * as AuthUtils from '../../../src/utils/auth'
import { ApiTypes } from '../../../src/types/api-types'

const mockApp = request(app)

const newProject: projectsSchemas.ProjectCreatePublic = {
  name: 'New project',
  color_hex: '#FAFAFA',
  description: 'Lorem ipsum dolor sit amet.',
  picture_url: 'https://imangelo.dev/banner.png'
}

const projectUpdate: projectsSchemas.ProjectUpdate = {
  name: 'Updated project',
  color_hex: '#AFAFAF',
  description: '.tema tis rolod muspi meroL',
  picture_url: 'https://portfolio.imangelo.dev/img/banner.png'
}

const mockDecodedToken: ApiTypes.AccessTokenPayload = {
  user_id: new ObjectId().toHexString(),
  secret: '',
  iat: 0
}

describe('Project controller test', () => {
  const verifyAccessTokenMock = vi.spyOn(AuthUtils, 'verifyAccessToken')

  beforeEach(() => {
    verifyAccessTokenMock.mockReset()
    verifyAccessTokenMock.mockResolvedValue(mockDecodedToken)
  })

  describe('create project', () => {
    const addProjectMock = vi.spyOn(projectsService, 'addProject')

    it('correct project creation', async () => {
      const projectNameExistsMock = vi.spyOn(
        projectsService,
        'projectNameExists'
      )

      const res = await mockApp
        .post('/projects')
        .set('Authorization', 'Bearer 123')
        .send(newProject)
        .expect(HTTP_STATUS.CREATED_201)

      expect(projectNameExistsMock).toBeCalledTimes(1)
      expect(projectNameExistsMock).toHaveBeenCalledWith(
        mockDecodedToken.user_id,
        newProject.name
      )

      expect(addProjectMock).toBeCalledTimes(1)
      expect(addProjectMock).toHaveBeenCalledWith({
        creator: mockDecodedToken.user_id,
        ...newProject
      })

      const { data: projectCreated } = res.body

      expect(projectCreated).toHaveProperty('id')
      expect(projectCreated).toHaveProperty('creator')
      expect(projectCreated).toHaveProperty('created_at')
      expect(projectCreated).toHaveProperty('updated_at')

      expect(projectCreated.name).toBe(newProject.name)
      expect(projectCreated.description).toBe(newProject.description)
      expect(projectCreated.color_hex).toBe(newProject.color_hex)
      expect(projectCreated.picture_url).toBe(newProject.picture_url)
    })
  })

  describe('get projects', () => {
    const findByCreatorMock = vi.spyOn(projectsService, 'findByCreator')

    it('all my projects', async () => {
      const res = await mockApp
        .get('/projects')
        .set('Authorization', 'Bearer 123')
        .expect(HTTP_STATUS.OK_200)

      expect(findByCreatorMock).toBeCalledTimes(1)
      expect(findByCreatorMock).toHaveBeenCalledWith(mockDecodedToken.user_id)

      const { data: projectRetrieved } = res.body

      expect(projectRetrieved).toEqual([])
    })

    it('project by id', async () => {
      const getProjectMock = vi.spyOn(projectsService, 'getProject')

      const createRes = await mockApp
        .post('/projects')
        .set('Authorization', 'Bearer 123')
        .send(newProject)

      const { data: projectCreated } = createRes.body

      const getRes = await mockApp
        .get('/projects/' + projectCreated.id)
        .set('Authorization', 'Bearer 123')
        .expect(HTTP_STATUS.OK_200)

      expect(getProjectMock).toBeCalledTimes(1)
      expect(getProjectMock).toHaveBeenCalledWith(projectCreated.id)

      const { data: projectRetrieved } = getRes.body

      expect(projectRetrieved).toEqual(projectCreated)
    })

    it('not found', async () => {
      await mockApp
        .get('/projects/' + new ObjectId().toHexString())
        .set('Authorization', 'Bearer 123')
        .expect(HTTP_STATUS.NOT_FOUND_404)
    })

    it('project is not mine', async () => {
      const res = await mockApp
        .post('/projects')
        .set('Authorization', 'Bearer 123')
        .send(newProject)
        .expect(HTTP_STATUS.CREATED_201)

      const { data: projectCreated } = res.body

      vi.spyOn(AuthUtils, 'verifyAccessToken').mockResolvedValueOnce({
        ...mockDecodedToken,
        user_id: new ObjectId().toHexString()
      })

      console.log('projectCreated', projectCreated)

      await mockApp
        .get('/projects/' + projectCreated.id)
        .set('Authorization', 'Bearer 321')
        .expect(HTTP_STATUS.OK_200)
    })
  })

  describe('update project', () => {
    it('correct project update', async () => {
      const updateProjectMock = vi.spyOn(projectsService, 'updateProject')
      const projectNameExistsMock = vi.spyOn(
        projectsService,
        'projectNameExists'
      )

      const createRes = await mockApp
        .post('/projects')
        .set('Authorization', 'Bearer 123')
        .send(newProject)

      const { data: projectCreated } = createRes.body

      const updateRes = await mockApp
        .patch('/projects/' + projectCreated.id)
        .set('Authorization', 'Bearer 123')
        .send(projectUpdate)
        .expect(HTTP_STATUS.OK_200)

      const { data: projectUpdated } = updateRes.body

      expect(projectNameExistsMock).toBeCalledTimes(2) // During creation and update

      expect(updateProjectMock).toHaveBeenCalledTimes(1)
      expect(updateProjectMock).toHaveBeenCalledWith(
        projectCreated.id,
        projectUpdate
      )

      expect(projectUpdated.name).toBe(projectUpdate.name)
      expect(projectUpdated.description).toBe(projectUpdate.description)
      expect(projectUpdated.color_hex).toBe(projectUpdate.color_hex)
      expect(projectUpdated.picture_url).toBe(projectUpdate.picture_url)
    })

    it('not found', async () => {
      await mockApp
        .patch('/projects/' + new ObjectId().toHexString())
        .set('Authorization', 'Bearer 321')
        .send({ name: 'New name' })
        .expect(HTTP_STATUS.NOT_FOUND_404)
    })

    it('project is not mine', async () => {
      const res = await mockApp
        .post('/projects')
        .set('Authorization', 'Bearer 123')
        .send(newProject)

      const { data: projectCreated } = res.body

      vi.spyOn(AuthUtils, 'verifyAccessToken').mockResolvedValueOnce({
        ...mockDecodedToken,
        user_id: new ObjectId().toHexString()
      })

      await mockApp
        .patch('/projects/' + projectCreated.id)
        .set('Authorization', 'Bearer 321')
        .send({ name: 'New name' })
        .expect(HTTP_STATUS.FORBIDDEN_403)
    })
  })
})
