import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
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

const TagModel = mongoose.model('Tag', TagSchema)
export default TagModel
