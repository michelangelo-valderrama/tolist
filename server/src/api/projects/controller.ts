import HTTP_STATUS from '../../constants/http-status'
import { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import ApiError from '../../utils/error'
import * as tasksService from '../tasks/service'
import { ProjectCreate, ProjectCreatePublic, ProjectUpdate } from './schemas'
import * as projectsService from './service'

export async function addProject(req: ApiTypes.Request): Promise<ApiResponse> {
  const { user_id: userId } = req.ctx!.decodedToken

  const projectCreatePublic: ProjectCreatePublic = req.body
  const projectCreate: ProjectCreate = {
    ...projectCreatePublic,
    creator: userId
  }

  await projectsService.projectNameExists(userId, projectCreate.name)

  const project = await projectsService.addProject(projectCreate)
  return new ApiResponse('Project added', project, HTTP_STATUS.CREATED_201)
}

export async function findByCreator(
  req: ApiTypes.Request
): Promise<ApiResponse> {
  const { user_id: userId } = req.ctx!.decodedToken

  const projects = await projectsService.findByCreator(userId)
  return new ApiResponse('Projects retreived', projects)
}

export async function deleteProject(
  req: ApiTypes.Request
): Promise<ApiResponse> {
  const projectId: string = req.params.projectId

  const { user_id: userId } = req.ctx!.decodedToken

  const project = await projectsService.getProject(projectId)

  if (project.creator != userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN_403,
      'You do not have permissions to delete this project'
    )
  }

  const projectPromise = projectsService.deleteProject(projectId)
  const tasksPromise = tasksService.deleteByProject(projectId)

  const [projectDeleted] = await Promise.all([projectPromise, tasksPromise])

  return new ApiResponse('Project deleted', projectDeleted)
}

export async function updateProject(
  req: ApiTypes.Request
): Promise<ApiResponse> {
  const { user_id: userId } = req.ctx!.decodedToken

  const projectId = req.params.projectId
  const projectUpdate: ProjectUpdate = req.body

  const project = await projectsService.getProject(projectId)

  if (project.creator != userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN_403,
      'You do not have permissions to update this project'
    )
  }

  if (projectUpdate.name && projectUpdate.name !== project.name) {
    await projectsService.projectNameExists(userId, projectUpdate.name)
  }

  const newProject = await projectsService.updateProject(
    projectId,
    projectUpdate
  )
  return new ApiResponse('Project updated', newProject)
}

export async function getProject(req: ApiTypes.Request): Promise<ApiResponse> {
  const projectId = req.params.projectId

  const project = await projectsService.getProject(projectId)
  return new ApiResponse('Project retreived', project)
}

export async function getProjectTasks(
  req: ApiTypes.Request
): Promise<ApiResponse> {
  const projectId = req.params.projectId

  const tasks = await tasksService.findByProject(projectId)
  return new ApiResponse('Project tasks retreived', tasks)
}
