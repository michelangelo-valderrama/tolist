import z from 'zod'
import { idSchema, hexColorSchema, alphabetSchema } from '../../schemas/db'

export const Tag = {
  new: (e: Record<string, any>) =>
    tagSchema.parse({
      name: e.name,
      description: e.description,
      color_hex: e.color_hex,
      creator: e.creator,
      created_at: e.created_at
    })
}

const tagBaseSchema = z.object({
  name: alphabetSchema.min(1).max(10),
  description: z.string().min(3).max(100).nullish(),
  color_hex: hexColorSchema.nullish(),
  creator: idSchema
})

export const tagSchema = tagBaseSchema.extend({
  created_at: z.date()
})

export const tagCreateSchema = tagBaseSchema

export const tagCreatePublicSchema = tagBaseSchema.omit({
  creator: true
})

export const tagUpdateSchema = tagCreatePublicSchema.partial()

export type Tag = z.infer<typeof tagSchema>
export type TagCreate = z.infer<typeof tagCreateSchema>
export type TagCreatePublic = z.infer<typeof tagCreatePublicSchema>
export type TagUpdate = z.infer<typeof tagUpdateSchema>
