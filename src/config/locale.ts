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
			Page: 'Страницы'
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
					'role.default': 'Обычный пользователь'
				}
			},
			Page: {
				properties: {
					name: 'Название',
					code: 'Символьный код',
					parent: 'Родитель',
					content: 'Содежимое страницы'
				}
			}
		}
	}
}