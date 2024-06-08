import z from 'zod'
import { idSchema } from '../../schemas/db'

export const Task = {
	new: (e: Record<string, any>) =>
		taskSchema.parse({
			id: e._id,
			title: e.title,
			done: e.done,
			color_hex: e.color_hex,
			content: e.content,
			project: e.project,
			creator: e.creator,
			updated_at: e.updated_at,
			created_at: e.created_at
		})
}

const taskBaseSchema = z.object({
	title: z.string(),
	content: z.string().nullish(),
	color_hex: z.string().nullish(),
	project: idSchema,
	creator: idSchema
})

export const taskSchema = taskBaseSchema.extend({
	id: idSchema,
	done: z.boolean(),
	updated_at: z.date(),
	created_at: z.date()
})

export const taskCreateSchema = taskBaseSchema.extend({})

export const taskCreatePublicSchema = z.object({
	title: z.string(),
	content: z.string().nullish(),
	color_hex: z.string().nullish(),
	project: idSchema
})

export type Task = z.infer<typeof taskSchema>
export type TaskCreate = z.infer<typeof taskCreateSchema>
export type TaskCreatePublic = z.infer<typeof taskCreatePublicSchema>
