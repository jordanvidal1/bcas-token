import pg from './pg';

const createOrUpdateTableQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tokens') THEN
    CREATE TABLE tokens (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      ticker VARCHAR(10) NOT NULL,
      description TEXT
    );
  ELSE
    ALTER TABLE tokens
    ADD COLUMN IF NOT EXISTS name VARCHAR(255) NOT NULL,
    ADD COLUMN IF NOT EXISTS ticker VARCHAR(10) NOT NULL,
    ADD COLUMN IF NOT EXISTS description TEXT;
  END IF;
END $$;
`;

// Function to perform database migration tasks
export async function migrate(): Promise<void> {
  let client;

  try {
    // Obtain a client from the pool
    client = await pg.connect();

    // Perform database migration tasks
    await client.query(createOrUpdateTableQuery);
    console.log('Database migration completed successfully');
  } catch (err) {
    // Handle errors
    console.error('Error migrating database:', err);
    throw err;
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}
