import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (request: Request, resource: Response) => {
	resource.send('Hello!')
})

export default router