import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const PlayerTable = pgTable('players', {
    id: serial('id').primaryKey(),
});

export const AuthTable = pgTable('auth', {
    id: varchar('id').primaryKey(),
    playerId: serial('player_id').references(() => PlayerTable.id),
});
