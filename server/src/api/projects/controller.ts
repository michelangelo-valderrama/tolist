import HTTP_STATUS from '../../constants/http-status'
import { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import * as tasksService from '../tasks/service'
import { ProjectCreate, ProjectCreatePublic, ProjectUpdate } from './schemas'
import * as projectsService from './service'

export async function addProject(req: ApiTypes.Request): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

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
	const userId = req.ctx!.decodedToken.user_id

	const projects = await projectsService.findByCreator(userId)
	return new ApiResponse('Projects retreived', projects)
}

export async function deleteProject(
	req: ApiTypes.Request
): Promise<ApiResponse> {
	const projectId: string = req.params.projectId

	const project = await projectsService.deleteProject(projectId)
	return new ApiResponse('Project deleted', project)
}

export async function updateProject(
	req: ApiTypes.Request
): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

	const projectId = req.params.projectId
	const projectUpdate: ProjectUpdate = req.body

	const project = await projectsService.getProject(projectId)

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
