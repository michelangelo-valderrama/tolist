import z from 'zod'
import { idSchema } from '../../schemas/db'

export const Task = {
	new: (e: Record<string, any>) =>
		taskSchema.parse({
			id: e._id,
			title: e.title,
			content: e.content,
			priority: e.priority,
			project: e.project,
			creator: e.creator,
			contexts: e.contexts,
			done: e.done,
			updated_at: e.updated_at,
			created_at: e.created_at
		})
}

const taskBaseSchema = z.object({
	title: z.string().min(3).max(50),
	content: z.string().max(10000).nullish(),
	priority: z.number().int().min(0).max(25).nullish(),
	project: idSchema,
	creator: idSchema,
	contexts: z.array(z.string()).max(5)
})

export const taskSchema = taskBaseSchema.extend({
	id: idSchema,
	done: z.boolean(),
	updated_at: z.date(),
	created_at: z.date()
})

export const taskCreateSchema = taskBaseSchema.extend({
	contexts: z
		.array(z.string())
		.max(5)
		.nullish()
		.transform((arr) => Array.from(new Set(arr)))
})

export const taskCreatePublicSchema = taskCreateSchema.omit({ creator: true })

export const taskUpdateSchema = taskCreatePublicSchema
	.extend({
		done: z.boolean()
	})
	.partial()

export type Task = z.infer<typeof taskSchema>
export type TaskCreate = z.infer<typeof taskCreateSchema>
export type TaskCreatePublic = z.infer<typeof taskCreatePublicSchema>
export type TaskUpdate = z.infer<typeof taskUpdateSchema>
