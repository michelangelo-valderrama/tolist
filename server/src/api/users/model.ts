import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		secret: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

const UserModel = mongoose.model('User', UserSchema)
export default UserModel
