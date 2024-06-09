import ContextModel from './model'
import { Context, ContextCreate } from '../contexts/schemas'

export async function addContext(
	contextCreate: ContextCreate
): Promise<Context> {
	const context = await ContextModel.create(contextCreate)
	return Context.new(context)
}

export async function getContext(contextId: string): Promise<Context> {
	const context = await ContextModel.findById(contextId)
	if (!context) {
		throw new Error('Context not found')
	}
	return Context.new(context)
}

export async function findByCreator(creatorId: string): Promise<Context[]> {
	const contexts = await ContextModel.find({ creator: creatorId }).lean().exec()
	return contexts.map(Context.new)
}
