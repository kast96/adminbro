import uploadFileFeature from '@adminjs/upload'
import { model, Schema } from 'mongoose'
import { contentNavigation } from '../config/navigation'

export type ModelType = {
  name: string
  description?: string
  link?: string
  buttonText?: string
}

export const BannerSchema = new Schema({
	name: { type: String, required: true },
  description: { type: String },
	link: { type: String },
	buttonText: { type: String },
})

export const langPropertiesBanner = {
  name: 'Название',
  description: 'Описание',
  link: 'Ссылка',
  buttonText: 'Текст кнопки'
}

export const Banner = model<ModelType>('Banner', BannerSchema)

export const resourceBanner = {
  resource: Banner,
  options: {
    navigation: contentNavigation,
    properties: {
      description: {
        type: 'richtext',
      }
    },
    /*features: [uploadFileFeature({
      //provider: { aws: { region, bucket, secretAccessKey ... } },
      provider: {},
      properties: {
        key: 'image',
        mimeType: 'imageType'
      },
      validation: {
        mimeTypes: ['application/png', 'application/jpeg', 'application/webp']
      }
    })]*/
  }
}