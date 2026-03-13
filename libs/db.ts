import { Pool } from "pg";
import { text } from "stream/consumers";
import { promiseHooks } from "v8";

// Prevenim crearea de multiple pool-uri la hot-reload in development
const globalForPg = global as unknown as {pool: Pool};

export const pool = globalForPg.pool || new Pool({
    connectionString: process.env.DATABASE_URL,
});

if(process.env.NODE_ENV!='production') globalForPg.pool=pool;

export const query=(text:string, params?:any[]) =>{
    pool.query(text,params);
}