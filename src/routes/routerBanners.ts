import express, { Request, Response } from 'express'
import { ModelType, Banner } from '../models/Banner'
import { getList } from '../utils/routerHelps'
const router = express.Router()

router.get('/', async (request: Request, resource: Response) => {
	const json = await getList<ModelType>(Banner, {})
	resource.json(json)
})

export default router