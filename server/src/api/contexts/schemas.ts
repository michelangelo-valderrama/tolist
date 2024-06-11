import z from 'zod'
import { idSchema, hexColorSchema, alphabetSchema } from '../../schemas/db'

export const Context = {
	new: (e: Record<string, any>) =>
		contextSchema.parse({
			name: e.name,
			description: e.description,
			color_hex: e.color_hex,
			creator: e.creator,
			created_at: e.created_at
		})
}

const contextBaseSchema = z.object({
	name: alphabetSchema.min(1).max(10),
	description: z.string().min(3).max(100).nullish(),
	color_hex: hexColorSchema.nullish(),
	creator: idSchema
})

export const contextSchema = contextBaseSchema.extend({
	created_at: z.date()
})

export const contextCreateSchema = contextBaseSchema

export const contextCreatePublicSchema = contextBaseSchema.omit({
	creator: true
})

export const contextUpdateSchema = contextCreatePublicSchema.partial()

export type Context = z.infer<typeof contextSchema>
export type ContextCreate = z.infer<typeof contextCreateSchema>
export type ContextCreatePublic = z.infer<typeof contextCreatePublicSchema>
export type ContextUpdate = z.infer<typeof contextUpdateSchema>
