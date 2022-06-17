const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books app documentation',
      version: '0.1.0',
      description: 'There is all routes for this app',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'SmolinR',
        url: 'https://github.com/SmolinR',
        email: 'rslnsmln@gmail.com',
      },
    },
    security: [{
      ApiKeyAuth: [],
    }],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          description: 'API key to authorize requests.',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    servers: [{
      url: 'http://localhost:3000',
    },
    {
      url: 'https://ancient-cove-98602.herokuapp.com/',
    }],
  },
  apis: ['./api/**/*.ts'],
};

export default options;