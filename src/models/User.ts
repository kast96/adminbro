import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { usersNavigation } from '../config/navigation'

export type ModelType = {
  login: string
  name?: string
  email: string
  encryptedPassword: string
  role: string
}

export const UserSchema = new Schema({
	name: { type: String },
	email: { type: String, required: true, unique: true },
	encryptedPassword: { type: String, required: true },
	role: { type: String, enum: ['admin', 'default'], required: true },
})

export const User = model<ModelType>('User', UserSchema)

export const resourceUser = {
  resource: User,
  options: {
    properties: {
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: 'password',
        isVisible: {
          list: false, edit: true, filter: false, show: false,
        },
      },
    },
    actions: {
      new: {
        before: async (request: {payload: ModelType & {password?: string}}) => {
          if(request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(request.payload.password, 10),
              password: undefined,
            }
          }
          return request
        },
      }
    },
    navigation: usersNavigation
  }
}