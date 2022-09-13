import mongoose from 'mongoose'
import express from 'express'
import formidableMiddleware from 'express-formidable'
import dotenv from 'dotenv'
import { setRoutes } from './src/routes/routes'

dotenv.config()

const app = express()
app.use(formidableMiddleware())

setRoutes(app)

const run = async () => {
	const port = process.env.PORT || 8080

	await mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@freecluster.g4ty6e4.mongodb.net/${process.env.BD}`)
	await app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

run()