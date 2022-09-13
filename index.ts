import mongoose from 'mongoose'
import express from 'express'
import formidableMiddleware from 'express-formidable'
import dotenv from 'dotenv'
import { setRoutes } from './src/routes/routes'
import { adminJS } from './src/routes/routerAdmin'

dotenv.config()

const app = express()
app.use(formidableMiddleware())

setRoutes(app)

const start = async () => {
	const port = process.env.PORT || 8080

	await mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@freecluster.g4ty6e4.mongodb.net/${process.env.BD}`)
	await app.listen(port, () => console.log(`AdminJS started on http://localhost:${port}${adminJS.options.rootPath}`))
}

start()