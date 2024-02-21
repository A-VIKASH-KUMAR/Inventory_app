import { Client } from 'pg'
import dotenv from "dotenv";
dotenv.config();

export const pgClient = async () => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        ssl:true
      });
      await client.connect();
      return client;
}