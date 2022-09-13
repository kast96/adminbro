import express, { Application } from 'express'
import routerIndex from './routerIndex'
import routerAdmin, { adminBro } from './routerAdmin'
import routerUsers from './routerUsers'
import routerPages from './routerPages'

export const setRoutes = (app: Application) => {
	app.use(express.json())
	
	app.use("/", routerIndex)
	app.use(adminBro.options.rootPath, routerAdmin)
	app.use("/users", routerUsers)
	app.use("/pages", routerPages)
}