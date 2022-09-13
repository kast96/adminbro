import express, { Request, Response } from 'express'
import { ModelType, Page } from '../models/Page'
import { getList } from '../utils/routerHelps'
const router = express.Router()

router.get('/', async (request: Request, resource: Response) => {
	const json = await getList<ModelType>(Page, {})
	resource.json(json)
})

export default router