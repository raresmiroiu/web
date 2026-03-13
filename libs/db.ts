import { Pool } from "pg";

// Prevenim crearea de multiple pool-uri la hot-reload in development
const globalForPg = global as unknown as {pool: Pool};

export const pool = globalForPg.pool || new Pool({
    connectionString: process.env.DATABASE_URL,
});

if(process.env.NODE_ENV!='production') globalForPg.pool=pool;

export const query=(text:string, params?:any[]) =>{
    return pool.query(text,params);
}