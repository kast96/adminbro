import express, { Application } from 'express'
import indexRouter from './routeIndex'

export const setRoutes = (app: Application) => {
	app.use(express.json())
	
	app.use("/", indexRouter)
}