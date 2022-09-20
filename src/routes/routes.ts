import express, { Application } from 'express'
import routerIndex from './routerIndex'
import routerAdmin, { adminJS } from './routerAdmin'
import routerUsers from './routerUsers'
import routerPages from './routerPages'
import routerBanners from './routerBanners'

export const setRoutes = (app: Application) => {
	app.use(express.json())
	
	app.use("/", routerIndex)
	app.use(adminJS.options.rootPath, routerAdmin)
	app.use("/users", routerUsers)
	app.use("/pages", routerPages)
	app.use("/banners", routerBanners)
}