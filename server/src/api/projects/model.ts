import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		color_hex: { type: String },
		picture_url: { type: String },
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		is_inbox_project: { type: String }
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

const ProjectModel = mongoose.model('Project', ProjectSchema)
export default ProjectModel
