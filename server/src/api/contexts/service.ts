import { Context, ContextCreate } from '../contexts/schemas'
import ApiError from '../../utils/error'
import HTTP_STATUS from '../../constants/http-status'
import * as tasksService from '../tasks/service'
import ContextModel from './model'

export async function addContext(
	contextCreate: ContextCreate
): Promise<Context> {
	const context = await ContextModel.create(contextCreate)
	return Context.new(context)
}

export async function getContext(contextName: string): Promise<Context> {
	const context = await ContextModel.findOne({ name: contextName })
		.lean()
		.exec()
	if (!context) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Context not found')
	}
	return Context.new(context)
}

export async function findByCreator(creatorId: string): Promise<Context[]> {
	const contexts = await ContextModel.find({ creator: creatorId }).lean().exec()
	return contexts.map(Context.new)
}

export async function findByNames(contextNames: string[]): Promise<Context[]> {
	const contexts = await ContextModel.find({ name: { $in: contextNames } })
		.lean()
		.exec()
	return contexts.map(Context.new)
}

export async function contextExists(contextName: string): Promise<boolean> {
	const context = await ContextModel.findOne({ name: contextName })
		.lean()
		.exec()
	return !!context
}

export async function deleteContext(contextName: string): Promise<void> {
	const context = await ContextModel.findOne({
		name: contextName
	}).exec()
	if (!context) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Context not found')
	}
	await Promise.all([
		tasksService.deleteContextFromTasks(contextName),
		context.deleteOne().exec()
	])
}
