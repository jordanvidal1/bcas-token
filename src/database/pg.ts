import { Pool } from 'pg';
import config from '../config';

// Create pool to allow connections
const pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    port: 5432,
    ssl: true
});

// Export the pool for use in other files
export default pool;
