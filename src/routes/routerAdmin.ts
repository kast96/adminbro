import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { resourceUser, User } from "../models/User"
import bcrypt from 'bcrypt'
import { Resource, Database } from '@adminjs/mongoose'
import { resourcePage } from '../models/Page'
import { locale } from "../config/locale"

AdminJS.registerAdapter({Resource, Database})

export const adminJS = new AdminJS({
	resources: [resourceUser, resourcePage],
	locale: locale,
	rootPath: '/admin',
})

const authenticate = async (email: string, password: string) => {
	const user = await User.findOne({ email })
	if (user) {
		if (user.role !== 'admin') return false
		const matched = await bcrypt.compare(password, user.encryptedPassword)
		if (matched) return user
	}
	return false
}

const router = AdminJSExpress.buildAuthenticatedRouter(
	adminJS,
	{
		authenticate,
		cookieName: 'adminjs',
		cookiePassword: 'sessionsecret',
	}
)

export default router