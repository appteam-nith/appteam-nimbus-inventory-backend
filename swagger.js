// filepath: /Users/princekhandelwal/Desktop/appteam nimbus/src/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AppTeam Nimbus API',
      version: '1.0.0',
      description: 'API documentation for AppTeam Nimbus project',
    },
   

      servers: [
        {
          url: process.env.DEPLOYED_URL || 'http://localhost:3000', // Use the deployed URL or fallback to localhost
        },

    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};