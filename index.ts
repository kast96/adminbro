import mongoose from 'mongoose'
import express from 'express'
import formidableMiddleware from 'express-formidable'
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { setRoutes } from './routes/routes'

dotenv.config()

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// express server definition
const app = express()
app.use(formidableMiddleware())

setRoutes(app)

// Resources definitions
const User = mongoose.model('User', new mongoose.Schema({
	login: { type: String, required: true },
	name: { type: String },
	email: { type: String, required: true },
	encryptedPassword: { type: String, required: true },
	role: { type: String, enum: ['admin', 'default'], required: true },
}))

// Routes definitions
app.get('/', (req: any, res: any) => res.send('Hello World!'))

// Route which returns last 100 users from the database
app.get('/users', async (req: any, res: any) => {
	const users = await User.find({}).limit(10)
	res.send(users)
})

// Route which creates new user
app.post('/users', async (req: any, res: any) => {
	const user = await new User(req.fields.user).save()
	res.send(user)
})

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
	resources: [{
		resource: User,
		options: {
			properties: {
				encryptedPassword: {
					isVisible: false,
				},
				password: {
					type: 'password',
					isVisible: {
						list: false, edit: true, filter: false, show: false,
					},
				},
			},
			actions: {
				new: {
					before: async (request: any) => {
						if(request.payload.password) {
							request.payload = {
								...request.payload,
								encryptedPassword: await bcrypt.hash(request.payload.password, 10),
								password: undefined,
							}
						}
						return request
					},
				}
			}
		}
	}],
	locale: {
		language: 'ru',
		translations: {
			actions: {
				new: 'Создать',
				list: 'Список',
				search: 'Поиск',
				edit: 'Редактировать',
				show: 'Просмотр',
				delete: 'Удалить',
				bulkDelete: 'Удалить выбранное',
			},
			buttons: {
				save: 'Сохранить',
			},
			labels: {
				User: 'Пользователи'
			},
			resources: {
				User: {
					properties: {
						login: 'Логин',
						name: 'Имя',
						email: 'Email',
						password: 'Пароль',
						role: 'Роль',
						'role.admin': 'Администратор',
						'role.default': 'Обычный пользователь',
					}
				}
			}
		}
	},
	rootPath: '/admin',
})

// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
	authenticate: async (email: any, password: any) => {
		const user = await User.findOne({ email })
		if (user) {
			if (user.role !== 'admin') return false
			const matched = await bcrypt.compare(password, user.encryptedPassword)
			if (matched) {
				return user
			}
		}
		return false
	},
	cookieName: 'admin',
	cookiePassword: 'admin',
})
app.use(adminBro.options.rootPath, router)

// Running the server
const run = async () => {
	const port = process.env.PORT || 8080

	await mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@freecluster.g4ty6e4.mongodb.net/${process.env.BD}`)
	await app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

run()