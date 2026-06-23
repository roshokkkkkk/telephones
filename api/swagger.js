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

function response(description = 'OK') {
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
        summary: `Create ${tag}`,
        requestBody: jsonContent,
        responses: { 200: response('Created') },
      },
      get: {
        tags: [tag],
        summary: `Get ${tag} list`,
        responses: { 200: response() },
      },
    },
    [`${basePath}/{id}`]: {
      get: {
        tags: [tag],
        summary: `Get ${tag} by id`,
        parameters: [idParam],
        responses: { 200: response(), 404: response('Not found') },
      },
      put: {
        tags: [tag],
        summary: `Update ${tag}`,
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response(), 404: response('Not found') },
      },
      delete: {
        tags: [tag],
        summary: `Delete ${tag}`,
        parameters: [idParam],
        responses: { 200: response(), 404: response('Not found') },
      },
    },
  };
}

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Telephones API',
    version: '1.0.0',
    description: 'Swagger documentation for the telephones store API.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Local API server',
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: jsonContent,
        responses: { 200: response('Registered') },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: jsonContent,
        responses: { 200: response('Logged in') },
      },
    },
    ...crudPaths('/users', 'Users'),
    ...crudPaths('/roles', 'Roles'),
    ...crudPaths('/role-users', 'Role Users'),
    ...crudPaths('/addresses', 'Addresses'),
    ...crudPaths('/products', 'Products'),
    '/products/{id}/image': {
      post: {
        tags: ['Products'],
        summary: 'Upload product image',
        parameters: [idParam],
        requestBody: multipartContent,
        responses: { 200: response(), 404: response('Not found') },
      },
    },
    ...crudPaths('/characteristics', 'Characteristics'),
    ...crudPaths('/product-characteristics', 'Product Characteristics'),
    '/inventory': {
      get: {
        tags: ['Inventory'],
        summary: 'Get inventory list',
        responses: { 200: response() },
      },
      post: {
        tags: ['Inventory'],
        summary: 'Set product inventory',
        requestBody: jsonContent,
        responses: { 200: response() },
      },
    },
    '/inventory/{productId}': {
      get: {
        tags: ['Inventory'],
        summary: 'Get product inventory',
        parameters: [productIdParam],
        responses: { 200: response(), 404: response('Not found') },
      },
      patch: {
        tags: ['Inventory'],
        summary: 'Update product inventory',
        parameters: [productIdParam],
        requestBody: jsonContent,
        responses: { 200: response() },
      },
    },
    ...crudPaths('/supplies', 'Supplies'),
    ...crudPaths('/sales', 'Sales'),
    '/cart': {
      get: {
        tags: ['Cart'],
        summary: 'Get user cart',
        parameters: [userIdQuery],
        responses: { 200: response() },
      },
      delete: {
        tags: ['Cart'],
        summary: 'Clear user cart',
        parameters: [userIdQuery],
        responses: { 200: response() },
      },
    },
    '/cart/items': {
      post: {
        tags: ['Cart'],
        summary: 'Add item to cart',
        requestBody: jsonContent,
        responses: { 200: response() },
      },
    },
    '/cart/items/{id}': {
      patch: {
        tags: ['Cart'],
        summary: 'Update cart item quantity',
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response(), 404: response('Not found') },
      },
      delete: {
        tags: ['Cart'],
        summary: 'Delete cart item',
        parameters: [idParam],
        responses: { 200: response(), 404: response('Not found') },
      },
    },
    '/orders': {
      post: {
        tags: ['Orders'],
        summary: 'Create order from cart',
        requestBody: jsonContent,
        responses: { 200: response() },
      },
      get: {
        tags: ['Orders'],
        summary: 'Get orders list',
        responses: { 200: response() },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order by id',
        parameters: [idParam],
        responses: { 200: response(), 404: response('Not found') },
      },
      delete: {
        tags: ['Orders'],
        summary: 'Delete order',
        parameters: [idParam],
        responses: { 200: response(), 404: response('Not found') },
      },
    },
    '/orders/{id}/status': {
      patch: {
        tags: ['Orders'],
        summary: 'Update order status',
        parameters: [idParam],
        requestBody: jsonContent,
        responses: { 200: response(), 404: response('Not found') },
      },
    },
    ...crudPaths('/statuses', 'Statuses'),
    ...crudPaths('/order-statuses', 'Order Statuses'),
    ...crudPaths('/order-items', 'Order Items'),
    ...crudPaths('/posts', 'Posts'),
  },
};

export default swaggerDocument;
