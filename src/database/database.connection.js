import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config();

const { Pool } = pg;

const configDataBase = {
    connectionString: process.env.DATABASE_URL
}

if(process.env.MODE === "prod") configDataBase.ssl = true;

export const db = new Pool(configDataBase);