import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    color_hex: String,
    picture_url: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    is_inbox_project: Boolean
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
