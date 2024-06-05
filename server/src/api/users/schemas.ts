import z from 'zod'
import { idSchema } from '../../schemas/db'
import { hashPassword } from '../../utils/auth'

export const User = {
	new: (entity: Record<string, any>) => {
		const candidate = {
			id: entity._id,
			name: entity.name,
			email: entity.email,
			hashedPassword: entity.hashedPassword,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
		return userSchema.parse(candidate)
	},
	public: (entity: Record<string, any>) => {
		const candidate = {
			id: entity._id ?? entity.id,
			name: entity.name,
			email: entity.email,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
		return userPublicSchema.parse(candidate)
	},
	create: (entity: UserCreatePublic) => {
		const candidate = {
			name: entity.name,
			email: entity.email,
			hashedPassword: hashPassword(entity.password)
		}
		return userCreateSchema.parse(candidate)
	}
}

const userBaseSchema = z.object({
	name: z.string(),
	email: z.string().email()
})

export const userSchema = userBaseSchema.extend({
	id: idSchema,
	hashedPassword: z.string(),
	updatedAt: z.date(),
	createdAt: z.date()
})

export const userCreateSchema = userBaseSchema.extend({
	hashedPassword: z.string()
})

export const userCreatePublicSchema = userBaseSchema.extend({
	password: z.string().min(2).max(16)
})

export const userPublicSchema = userBaseSchema.extend({
	id: idSchema,
	updatedAt: z.date(),
	createdAt: z.date()
})

export const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(2).max(16)
})

export type User = z.infer<typeof userSchema>
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserCreatePublic = z.infer<typeof userCreatePublicSchema>
export type UserPublic = z.infer<typeof userPublicSchema>
