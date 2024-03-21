import express, { Request, Response } from 'express';
import pg from '../database/pg';

const router = express.Router();

// Query to create a token
const createTokenQuery = `
INSERT INTO tokens (name, ticker, description)
VALUES ($1, $2, $3)
RETURNING id, name, ticker, description;`;

// Query to get a token by id
const getTokenByIdQuery = `
SELECT id, name, ticker, description
FROM tokens
WHERE id = $1;`;

router.post('/', async (req: Request, res: Response) => {
    const { name, ticker, description } = req.body;

    if (!name || !ticker || !description) {
        console.error('Missing params');
        return res.status(400).send({
            error: {
                code: 400,
                message: 'Missing params'
            }
        });
    }

    try {
        // use pg client to connect
        const client = await pg.connect();
        // run database query
        const result = await client.query(createTokenQuery, [
            name,
            ticker,
            description
        ]);
        const newToken = result.rows[0];

        // release client back to the pool once finished
        client.release();

        res.status(201).json(newToken);
    } catch (err) {
        // console and return 500 error response if an error is caught
        console.error('Error creating token:', err);
        res.status(500).send({
            error: {
                code: 500,
                message: 'Internal Server Error'
            }
        });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const tokenId = req.params.id;

    try {
        // use pg client to connect
        const client = await pg.connect();
        // run database query
        const result = await client.query(getTokenByIdQuery, [tokenId]);
        // get token from 1st instance in array
        const token = result.rows[0];

        // release client back to the pool once finished
        client.release();

        if (!token) {
            // if no token send 404 and error message
            res.status(404).send({
                error: {
                    code: 404,
                    message: 'Token not found'
                }
            });
        } else {
            // else return token
            res.json(token);
        }
    } catch (err) {
        // console and return 500 error response if an error is caught
        console.error('Error retrieving token:', err);
        res.status(500).send({
            error: {
                code: 500,
                message: 'Internal Server Error'
            }
        });
    }
});

export default router;
