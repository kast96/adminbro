import { locale } from "../lang/ru/locale"
import { resourceUser, User } from "../models/User"
import bcrypt from 'bcrypt'
import { resourcePage } from "../models/Page"

const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

AdminBro.registerAdapter(require('admin-bro-mongoose'))

export const adminBro = new AdminBro({
	resources: [resourceUser, resourcePage],
	locale: locale,
	rootPath: '/admin',
})

export const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
	authenticate: async (email: string, password: string) => {
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

export default router