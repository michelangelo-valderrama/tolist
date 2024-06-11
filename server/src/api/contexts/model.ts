import mongoose from 'mongoose'

const ContextSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: String,
	color_hex: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	created_at: { type: Date, default: Date.now }
})

ContextSchema.index({ name: 1 })

const ContextModel = mongoose.model('Context', ContextSchema)
export default ContextModel
