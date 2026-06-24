const jsonContent = {
  content: {
    'application/json': {
      schema: { type: 'object', additionalProperties: true },
    },
  },
};

const multipartContent = {
  content: {
    'multipart/form-data': {
      schema: {
        type: 'object',
        properties: {
          image: { type: 'string', format: 'binary' },
          picture: { type: 'string', format: 'binary' },
        },
      },
    },
  },
};

const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'string' },
};

const productIdParam = {
  name: 'productId',
  in: 'path',
  required: true,
  schema: { type: 'string' },
};

const userIdQuery = {
  name: 'userId',
  in: 'query',
  required: true,
  schema: { type: 'string' },
};

function response(description = 'Успешный ответ') {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'object', additionalProperties: true },
      },
    },
  };
}

function crudPaths(basePath, tag) {
  return {
    [basePath]: {
      post: {
        tags: [tag],
        summary: `Создать ${tag}`,
        requestBody: jsonContent,
        responses: { 200: response('Создано') },
      },
      get: {
        tags: [tag],
        summary: `Получить список ${tag}`,
        responses: { 200: response('Список получен') },
      },
    },
    [`${basePath}/{id}`]: {
      get: {
        tags: [tag],
        summary: `Получить ${tag} по ID`,
        parameters: [idParam],
        responses: { 200: response('Найдено'), 404: response('Не найдено') },
      },
      put: {
        tags: [tag],
        summary: `Обновить ${tag}`,
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response('Обновлено'), 404: response('Не найдено') },
      },
      delete: {
        tags: [tag],
        summary: `Удалить ${tag}`,
        parameters: [idParam],
        responses: { 200: response('Удалено'), 404: response('Не найдено') },
      },
    },
  };
}

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Телефонного магазина',
    version: '1.0.0',
    description: 'Swagger документация для API телефонного магазина.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Локальный API сервер',
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Авторизация'],
        summary: 'Регистрация пользователя',
        requestBody: jsonContent,
        responses: { 200: response('Пользователь зарегистрирован') },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Авторизация'],
        summary: 'Вход пользователя',
        requestBody: jsonContent,
        responses: { 200: response('Вход выполнен') },
      },
    },

    ...crudPaths('/users', 'Пользователи'),
    ...crudPaths('/roles', 'Роли'),
    ...crudPaths('/role-users', 'Назначение ролей'),
    ...crudPaths('/addresses', 'Адреса'),
    ...crudPaths('/products', 'Товары'),
    '/products/{id}/image': {
      post: {
        tags: ['Товары'],
        summary: 'Загрузить изображение товара',
        parameters: [idParam],
        requestBody: multipartContent,
        responses: { 200: response('Изображение загружено'), 404: response('Товар не найден') },
      },
    },
    ...crudPaths('/characteristics', 'Характеристики'),
    ...crudPaths('/product-characteristics', 'Характеристики товаров'),
    '/inventory': {
      get: {
        tags: ['Склад'],
        summary: 'Получить список остатков',
        responses: { 200: response('Список получен') },
      },
      post: {
        tags: ['Склад'],
        summary: 'Установить количество товара',
        requestBody: jsonContent,
        responses: { 200: response('Количество установлено') },
      },
    },
    '/inventory/{productId}': {
      get: {
        tags: ['Склад'],
        summary: 'Получить остаток по товару',
        parameters: [productIdParam],
        responses: { 200: response('Остаток найден'), 404: response('Не найдено') },
      },
      patch: {
        tags: ['Склад'],
        summary: 'Обновить количество товара',
        parameters: [productIdParam],
        requestBody: jsonContent,
        responses: { 200: response('Количество обновлено') },
      },
    },
    ...crudPaths('/supplies', 'Поставки'),
    ...crudPaths('/sales', 'Продажи'),
    '/cart': {
      get: {
        tags: ['Корзина'],
        summary: 'Получить корзину пользователя',
        parameters: [userIdQuery],
        responses: { 200: response('Корзина получена') },
      },
      delete: {
        tags: ['Корзина'],
        summary: 'Очистить корзину пользователя',
        parameters: [userIdQuery],
        responses: { 200: response('Корзина очищена') },
      },
    },
    '/cart/items': {
      post: {
        tags: ['Корзина'],
        summary: 'Добавить товар в корзину',
        requestBody: jsonContent,
        responses: { 200: response('Товар добавлен') },
      },
    },
    '/cart/items/{id}': {
      patch: {
        tags: ['Корзина'],
        summary: 'Обновить количество товара в корзине',
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response('Количество обновлено'), 404: response('Не найдено') },
      },
      delete: {
        tags: ['Корзина'],
        summary: 'Удалить товар из корзины',
        parameters: [idParam],
        responses: { 200: response('Товар удален'), 404: response('Не найдено') },
      },
    },
    '/orders': {
      post: {
        tags: ['Заказы'],
        summary: 'Создать заказ из корзины',
        requestBody: jsonContent,
        responses: { 200: response('Заказ создан') },
      },
      get: {
        tags: ['Заказы'],
        summary: 'Получить список заказов',
        responses: { 200: response('Список получен') },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Заказы'],
        summary: 'Получить заказ по ID',
        parameters: [idParam],
        responses: { 200: response('Заказ найден'), 404: response('Не найдено') },
      },
      delete: {
        tags: ['Заказы'],
        summary: 'Удалить заказ',
        parameters: [idParam],
        responses: { 200: response('Заказ удален'), 404: response('Не найдено') },
      },
    },
    '/orders/{id}/status': {
      patch: {
        tags: ['Заказы'],
        summary: 'Обновить статус заказа',
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response('Статус обновлен'), 404: response('Не найдено') },
      },
    },
    ...crudPaths('/statuses', 'Статусы'),
    ...crudPaths('/order-statuses', 'История статусов заказов'),
    ...crudPaths('/order-items', 'Элементы заказов'),
    ...crudPaths('/posts', 'Посты'),
  },
};

export default swaggerDocument;