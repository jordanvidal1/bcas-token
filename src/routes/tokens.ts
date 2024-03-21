import express, { Request, Response } from 'express';
import pg from '../database/pg';

const router = express.Router();

const createTokenQuery = `
INSERT INTO tokens (name, ticker, description)
VALUES ($1, $2, $3)
RETURNING id, name, ticker, description;`;

const getTokenByIdQuery = `
SELECT id, name, ticker, description
FROM tokens
WHERE id = $1;`;

router.post('/', async (req: Request, res: Response) => {
    const { name, ticker, description } = req.body;

    try {
        const client = await pg.connect();
        const result = await client.query(createTokenQuery, [
            name,
            ticker,
            description
        ]);
        const newToken = result.rows[0];

        client.release();

        res.status(201).json(newToken);
    } catch (err) {
        console.error('Error creating token:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const tokenId = req.params.id;

    try {
        const client = await pg.connect();
        const result = await client.query(getTokenByIdQuery, [tokenId]);
        const token = result.rows[0];

        client.release();

        if (!token) {
            res.status(404).send({
                error: {
                    message: 'Token not found'
                }
            });
        } else {
            res.json(token);
        }
    } catch (err) {
        console.error('Error retrieving token:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
