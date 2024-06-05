import mongoose from 'mongoose'
import z from 'zod'

const idSchema = z
	.string()
	.length(24)
	.or(z.instanceof(mongoose.Types.ObjectId).transform((v) => v.toString()))

export { idSchema }
