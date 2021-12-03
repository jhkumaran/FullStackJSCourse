import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const { 
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

const env = (ENV as unknown as string).replace(/\s/g, "");
console.log(env);
console.log(env === 'test');
const client = new Pool({
    host: POSTGRES_HOST,
    database: env === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

export default client;