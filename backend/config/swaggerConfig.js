import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Book Keeping Service API Documentation', // API title
            version: '1.0.0', // Version number
            description: 'API documentation for the Book Management Service',
        },
        servers: [
            {
            url: 'https://book-keeping-service-api.vercel.app/', // Change to your API server URL
            },
        ],
    },
    apis: ['./backend/swaggerDocs/*.js'], // Path to the API docs (where your routes are defined)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs