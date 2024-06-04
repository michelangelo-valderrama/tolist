import z from 'zod'
import mongoose from 'mongoose'

export const Task = {
	new: (entity: Record<string, any>) => {
		const candidate = {
			id: entity._id,
			title: entity.title,
			done: entity.done,
			updatedAt: entity.updatedAt,
			createdAt: entity.createdAt
		}
		return taskSchema.parse(candidate)
	}
}

const taskBaseSchema = z.object({
	title: z.string()
})

export const taskSchema = taskBaseSchema.extend({
	id: z.instanceof(mongoose.Types.ObjectId),
	done: z.boolean(),
	updatedAt: z.date(),
	createdAt: z.date()
})

export const taskCreateSchema = taskBaseSchema.extend({})

export type Task = z.infer<typeof taskSchema>
export type TaskCreate = z.infer<typeof taskCreateSchema>
