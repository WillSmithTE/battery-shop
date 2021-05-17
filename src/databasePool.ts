import {Pool} from 'pg';

const connectionString = process.env.NODE_ENV === 'development' ?
    'postgresql://postgres:postgres@localhost:5432/shop-db' : 'postgres://postgres:postgres@postgres:5432/shop-db'

export const databasePool = new Pool({
    max: 10,
    connectionString,
    idleTimeoutMillis: 60000
});
