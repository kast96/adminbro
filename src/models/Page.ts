import { model, Schema } from 'mongoose'
import { structureNavigation } from '../config/navigation'

export type ModelType = {
  name: string
  code: string
  parent?: any
  content?: string
}

export const PageSchema = new Schema({
	name: { type: String, required: true },
	code: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Page' },
  content: { type: String }
})

export const Page = model<ModelType>('Page', PageSchema)

export const resourcePage = {
  resource: Page,
  options: {
    navigation: structureNavigation
  }
}