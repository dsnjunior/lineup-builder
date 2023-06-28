import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "next-auth/adapters";

export const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const playerSources = mysqlTable("player_sources", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const players = mysqlTable("players", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  shortname: varchar("shortname", { length: 255 }).notNull(),
  birthDate: timestamp("birth_date", { mode: "date" }).notNull(),
  picture: varchar("picture", { length: 255 }).notNull(),
  clubId: varchar("club_id", { length: 20 }),
});

export const playersRelations = relations(players, ({ one }) => ({
  club: one(clubs, { fields: [players.clubId], references: [clubs.id] }),
  sources: one(playerSources, {
    fields: [players.id],
    references: [playerSources.id],
  }),
}));

export const clubs = mysqlTable("clubs", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  shortname: varchar("shortname", { length: 255 }).notNull(),
  acronym: varchar("acronym", { length: 5 }).notNull(),
  picture: varchar("picture", { length: 255 }).notNull(),
});

export const clubsRelations = relations(clubs, ({ many }) => ({
  player: many(players),
}));
