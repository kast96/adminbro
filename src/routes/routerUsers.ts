import express, { Request, Response } from 'express'
import { ModelType, User } from '../models/User'
import { getList } from '../utils/routerHelps'
const router = express.Router()

router.get('/', async (request: Request, resource: Response) => {
	const json = await getList<ModelType>(User, {})
	resource.json(json)
})

export default router