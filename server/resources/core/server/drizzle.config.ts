import { defineConfig } from 'drizzle-kit';

console.log('DATABASE_URL', process.env.DATABASE_URL);

export default defineConfig({
    schema: './src/database/tables/index.ts',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
