import { langPropertiesPage } from "../models/Page";
import { langPropertiesUser } from "../models/User";
import { langPropertiesBanner } from "../models/Banner";

export const locale = {
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
			User: 'Пользователи',
			Page: 'Страницы',
			Banner: 'Основной баннер',
		},
		resources: {
			User: {
				properties: langPropertiesUser
			},
			Page: {
				properties: langPropertiesPage
			},
			Banner: {
				properties: langPropertiesBanner
			},
		}
	}
}