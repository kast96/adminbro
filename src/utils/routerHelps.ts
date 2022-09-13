import { Model } from 'mongoose'

type PropsGetListType = {
  limit?: number
  page?: number
}

export const getList = async <T>(model: Model<T>, {limit = 20, page = 1}: PropsGetListType) => {
	const query = model.find({})
	const count = await query.clone().count()
	const items = await query.skip((page - 1) * limit).limit(limit)

	return {items, count, page, limit}
}