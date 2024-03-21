import express from 'express';
import bodyParser from 'body-parser';
import { migrate } from './database/migrate';
import routes from './routes';
import swaggerSetup from './swagger';

const errorHandler = require('express-error-handler');

const app = express();

const PORT = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.json());

// error handling middleware
app.use(errorHandler());

// define routes
app.use(routes);

// define swagger endpoint
app.use('/api-docs', swaggerSetup);

// Define an async function to perform migration and start the server
async function start() {
    try {
        // Call migrate function
        await migrate();

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error migrating database:', err);
        process.exit(1);
    }
}

// Call the async function to start the server
start();
