import mongoose from 'mongoose'

const ContextSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	color_hex: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	created_at: { type: Date, default: Date.now }
})

const ContextModel = mongoose.model('Context', ContextSchema)
export default ContextModel
