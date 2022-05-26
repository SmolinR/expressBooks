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
        }],
    },
    apis: ['./api/user/router.js', './api/user/model.js',
        './api/book/router.js', './api/book/model.js',
        './api/auth/router.js', './api/category/model.js',
        './api/category/router.js', './api/admin/router.js'],
};
module.exports = options;
