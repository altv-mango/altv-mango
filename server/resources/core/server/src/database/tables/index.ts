import { json, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const playerTable = pgTable('player', {
    id: serial('id').primaryKey(),
});

export const authProviderEnum = pgEnum('auth_provider', ['discord']);
export const authTable = pgTable('auth', {
    provider: authProviderEnum('provider'),
    id: varchar('id').primaryKey(),
    data: json('data'),
    playerId: serial('player_id').references(() => playerTable.id),
});
