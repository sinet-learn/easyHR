import pg from 'pg';
import 'dotenv/config';

async function test() {
    const connectionString = process.env.DATABASE_URL;
    console.log('Testing connection to:', connectionString?.split('@')[1]);

    const pool = new pg.Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const client = await pool.connect();
        console.log('Successfully connected to Postgres!');
        const res = await client.query('SELECT NOW()');
        console.log('Current time from DB:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await pool.end();
    }
}

test();
