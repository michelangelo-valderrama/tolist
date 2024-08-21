import mongoose from 'mongoose'
import z from 'zod'

const idSchema = z
  .string()
  .length(24)
  .or(z.instanceof(mongoose.Types.ObjectId).transform((v) => v.toString()))

const hexColorSchema = z.custom<`#${string}`>((d) => {
  return typeof d === 'string' ? /^#[0-9A-F]{6}$/i.test(d) : false
}, "Invalid hex color format (e.g. '#FFFFFF')")

const alphabetSchema = z
  .string()
  .regex(/^[a-zA-Z]+$/, 'Only alphabet characters are allowed')

export { idSchema, hexColorSchema, alphabetSchema }
