import z from 'zod'
import { idSchema } from '../../schemas/db'
import { hashPassword } from '../../utils/auth'

export const User = {
	new: (e: Record<string, any>) =>
		userSchema.parse({
			id: e._id,
			...e
		}),
	public: (e: Record<string, any>) =>
		userPublicSchema.parse({
			id: e._id ?? e.id,
			...e
		}),
	create: (e: UserCreatePublic) =>
		userCreateSchema.parse({
			hashed_password: hashPassword(e.password),
			...e
		})
}

const userBaseSchema = z.object({
	name: z.string(),
	email: z.string().email()
})

export const userSchema = userBaseSchema.extend({
	id: idSchema,
	hashed_password: z.string(),
	secret: z.string().optional(),
	updated_at: z.date(),
	created_at: z.date()
})

export const userCreateSchema = userBaseSchema.extend({
	hashed_password: z.string()
})

export const userCreatePublicSchema = userBaseSchema.extend({
	password: z.string().min(2).max(16)
})

export const userPublicSchema = userBaseSchema.extend({
	id: idSchema,
	updated_at: z.date(),
	created_at: z.date()
})

export const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(2).max(16)
})

export type User = z.infer<typeof userSchema>
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserCreatePublic = z.infer<typeof userCreatePublicSchema>
export type UserPublic = z.infer<typeof userPublicSchema>
