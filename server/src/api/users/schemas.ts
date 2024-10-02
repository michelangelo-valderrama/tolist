import projectsSchemas from 'zod'
import { hashPassword } from '../../utils/auth'
import { idSchema } from '../../schemas/db'

export const User = {
  new: (e: Record<string, any>) =>
    userSchema.parse({
      id: e._id,
      name: e.name,
      email: e.email,
      hashed_password: e.hashed_password,
      secret: e.secret,
      updated_at: e.updated_at,
      created_at: e.created_at
    }),
  public: (e: User) => userPublicSchema.parse(e),
  create: (e: UserCreatePublic) =>
    userCreateSchema.parse({
      hashed_password: hashPassword(e.password),
      ...e
    })
}

const userBaseSchema = projectsSchemas.object({
  name: projectsSchemas.string().min(2).max(20),
  email: projectsSchemas.string().email()
})

export const userSchema = userBaseSchema.extend({
  id: idSchema,
  hashed_password: projectsSchemas.string(),
  secret: projectsSchemas.string().nullish(),
  updated_at: projectsSchemas.date(),
  created_at: projectsSchemas.date()
})

export const userCreateSchema = userBaseSchema.extend({
  hashed_password: projectsSchemas.string()
})

export const userCreatePublicSchema = userBaseSchema.extend({
  password: projectsSchemas.string().min(6).max(50)
})

export const userPublicSchema = userSchema.omit({
  hashed_password: true,
  secret: true
})

export const userLoginSchema = userCreatePublicSchema.pick({
  name: true,
  password: true
})

export type User = projectsSchemas.infer<typeof userSchema>
export type UserCreate = projectsSchemas.infer<typeof userCreateSchema>
export type UserCreatePublic = projectsSchemas.infer<
  typeof userCreatePublicSchema
>
export type UserPublic = projectsSchemas.infer<typeof userPublicSchema>
export type userLoginSchema = projectsSchemas.infer<typeof userLoginSchema>
