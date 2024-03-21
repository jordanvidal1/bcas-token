import express from 'express';
import bodyParser from 'body-parser';
import { migrate } from './database/migrate';
import routes from './routes';
import swaggerSetup from './swagger';

const errorHandler = require('express-error-handler');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(errorHandler());

app.use(routes);

app.use('/api-docs', swaggerSetup);

migrate().catch((err) => {
    console.error('Error migrating database:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
