import z from 'zod'
import { idSchema, hexColorSchema } from '../../schemas/db'

export const Project = {
	new: (e: Record<string, any>) =>
		projectSchema.parse({
			id: e._id,
			...e
		})
}

const projectBaseSchema = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(250).nullish(),
	color_hex: hexColorSchema.nullish(),
	picture_url: z.string().url().nullish()
})

export const projectSchema = projectBaseSchema.extend({
	id: idSchema,
	creator: idSchema,
	updated_at: z.date(),
	created_at: z.date()
})

export const projectCreateSchema = projectBaseSchema.extend({
	creator: idSchema
})

export const projectCreatePublicSchema = projectBaseSchema.extend({})

export const projectUpdateSchema = projectBaseSchema.partial()

export type Project = z.infer<typeof projectSchema>
export type ProjectCreate = z.infer<typeof projectCreateSchema>
export type ProjectCreatePublic = z.infer<typeof projectCreatePublicSchema>
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>
