import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		done: { type: Boolean, default: false },
		content: String,
		color_hex: String,
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

const TaskModel = mongoose.model('Task', TaskSchema)
export default TaskModel
