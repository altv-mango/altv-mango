import { Injectable, type OnModuleInit } from '@altv-mango/server';
// import pg from 'pg';
// import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Injectable()
export class DatabaseService implements OnModuleInit {
    public database: PostgresJsDatabase;

    public async onModuleInit() {
        const sql = postgres(process.env['DATABASE_URL']!, { debug: true });
        this.database = drizzle(sql);
    }

    // public async onModuleInit() {
    //     const client = new pg.Client({
    //         connectionString: process.env['DATABASE_URL']!,
    //     });
    //     await client.connect();
    //     this.database = drizzle(client);
    // }
}
