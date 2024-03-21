import express, { Router, Request, Response } from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import { expect } from '@jest/globals';
import indexRouter from '../../src/routes';

jest.mock('../../src/routes/tokens', () => {
    const router = Router();

    // Mock data
    const tokens = [
        {
            id: 1,
            name: 'mockedToken1',
            ticker: 'MT1',
            description: 'mocked token 1'
        },
        {
            id: 2,
            name: 'mockedToken2',
            ticker: 'MT2',
            description: 'mocked token 2'
        }
    ];
    let nextId = 3;

    // Mock implementation for /tokens route
    router.get('/:id', (req: Request, res: Response) => {
        // Find token by id
        const token = tokens.find((t) => t.id === parseInt(req.params.id));

        // Respond with token or 404 if not found
        if (token) {
            res.json(token);
        } else {
            res.status(404).json({
                error: { status: 404, message: 'Token not found' }
            });
        }
    });

    router.post('/', (req: Request, res: Response) => {
        const { name, ticker, description } = req.body;

        if (!name || !ticker || !description) {
            return res.status(400).json({
                error: { status: 400, message: 'Missing params' }
            });
        }

        const newToken = {
            id: nextId++,
            name,
            ticker,
            description
        };

        tokens.push(newToken);
        res.status(201).json(newToken);
    });

    return router;
});

describe('Index Router', () => {
    describe('should respond to GET /tokens route', () => {
        it('should respond with token details for a valid token id', async () => {
            const app = express();
            app.use(indexRouter);

            // Request token details with id 1
            const response = await request(app).get('/tokens/1');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                name: 'mockedToken1',
                ticker: 'MT1',
                description: 'mocked token 1'
            });
        });

        it('should respond with 404 for invalid token id', async () => {
            const app = express();
            app.use(indexRouter);

            // Request token details with invalid id
            const response = await request(app).get('/tokens/3');

            // Assertions
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: {
                    status: 404,
                    message: 'Token not found'
                }
            });
        });
    });

    describe('should respond to POST /tokens route', () => {
        it('should respond with token details after successfully creating', async () => {
            const app = express();
            app.use(bodyParser.json());

            app.use(indexRouter);

            // Create token with valid details
            const response = await request(app).post('/tokens').send({
                name: 'mockedToken3',
                ticker: 'MT3',
                description: 'mocked token 3'
            });

            // Assertions
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                id: 3,
                name: 'mockedToken3',
                ticker: 'MT3',
                description: 'mocked token 3'
            });
        });

        it('should respond with 400 if missing params', async () => {
            const app = express();
            app.use(bodyParser.json());

            app.use(indexRouter);

            // Create token with missing name
            const response = await request(app).post('/tokens').send({
                ticker: 'MT3',
                description: 'mocked token 3'
            });

            // Assertions
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: {
                    status: 400,
                    message: 'Missing params'
                }
            });
        });
    });

    describe("should respond with 404 endpoint that doesn't exist", () => {
        it('should respond with 404', async () => {
            const app = express();
            app.use(indexRouter);

            // Request token details with id 1
            const response = await request(app).get('/ewjwieo');

            // Assertions
            expect(response.status).toBe(404);
            expect(response.body).toEqual({});
        });
    });
});
