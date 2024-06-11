import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import ProjectModel from './model'
import { Project, ProjectCreate, ProjectUpdate } from './schemas'

export async function addProject(project: ProjectCreate): Promise<Project> {
	const projectDoc = await ProjectModel.create(project)
	return Project.new(projectDoc)
}

export async function getProject(projectId: string): Promise<Project> {
	const project = await ProjectModel.findById(projectId).lean().exec()
	if (!project)
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Project not found')
	return Project.new(project)
}

export async function findByCreator(creatorId: string): Promise<Project[]> {
	const projects = await ProjectModel.find({ creator: creatorId }).lean().exec()
	return projects.map(Project.new)
}

export async function deleteProject(projectId: string): Promise<Project> {
	const project = await ProjectModel.findByIdAndDelete(projectId).lean().exec()
	if (!project)
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Project not found')
	return Project.new(project)
}

export async function projectNameExists(
	creatorId: string,
	name: string
): Promise<boolean> {
	const project = await ProjectModel.findOne({ creator: creatorId, name })
		.lean()
		.exec()
	if (project) {
		throw new ApiError(
			HTTP_STATUS.CONFLICT_409,
			`Project with name ${project.name} already exists`
		)
	}
	return !!project
}

export async function updateProject(
	projectId: string,
	projectUpdate: ProjectUpdate
): Promise<Project> {
	const project = await ProjectModel.findByIdAndUpdate(
		projectId,
		projectUpdate,
		{ new: true }
	)
		.lean()
		.exec()
	if (!project)
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Project not found')
	return Project.new(project)
}

export async function addInboxProject(creatorId: string): Promise<Project> {
	const project = await ProjectModel.create({
		is_inbox_project: true,
		creator: creatorId,
		name: 'Inbox'
	})
	return Project.new(project)
}
