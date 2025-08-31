import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  position: varchar("position"), // Job position for role-based filtering
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Learning packs (17 structured packs)
export const learningPacks = pgTable("learning_packs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  order: integer("order").notNull(), // Sequential order 1-17
  estimatedHours: integer("estimated_hours"),
  targetPosition: varchar("target_position"), // Target job position
  createdAt: timestamp("created_at").defaultNow(),
});

// Videos in learning packs (7 videos per pack)
export const packVideos = pgTable("pack_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packId: varchar("pack_id").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  youtubeId: varchar("youtube_id").notNull(),
  duration: integer("duration"), // Duration in seconds
  order: integer("order").notNull(), // Order within pack 1-7
  createdAt: timestamp("created_at").defaultNow(),
});

// General content library (open access videos)
export const generalVideos = pgTable("general_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  youtubeId: varchar("youtube_id").notNull(),
  duration: integer("duration"),
  thumbnailUrl: varchar("thumbnail_url"),
  category: varchar("category"), // e.g., "leadership", "technical", "popular"
  targetPosition: varchar("target_position"), // For role-based filtering
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// User progress for learning packs
export const userPackProgress = pgTable("user_pack_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  packId: varchar("pack_id").notNull(),
  completedVideos: integer("completed_videos").default(0), // Out of 7
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User video completion tracking
export const userVideoProgress = pgTable("user_video_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  videoId: varchar("video_id").notNull(), // Can be pack video or general video
  videoType: varchar("video_type").notNull(), // "pack" or "general"
  watchedDuration: integer("watched_duration").default(0), // Seconds watched
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User achievements and certificates
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  packId: varchar("pack_id"), // Null for general achievements
  type: varchar("type").notNull(), // "pack_completion", "streak", "milestone"
  title: varchar("title").notNull(),
  description: text("description"),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  packProgress: many(userPackProgress),
  videoProgress: many(userVideoProgress),
  achievements: many(userAchievements),
}));

export const learningPacksRelations = relations(learningPacks, ({ many }) => ({
  videos: many(packVideos),
  userProgress: many(userPackProgress),
}));

export const packVideosRelations = relations(packVideos, ({ one }) => ({
  pack: one(learningPacks, {
    fields: [packVideos.packId],
    references: [learningPacks.id],
  }),
}));

export const userPackProgressRelations = relations(userPackProgress, ({ one }) => ({
  user: one(users, {
    fields: [userPackProgress.userId],
    references: [users.id],
  }),
  pack: one(learningPacks, {
    fields: [userPackProgress.packId],
    references: [learningPacks.id],
  }),
}));

export const userVideoProgressRelations = relations(userVideoProgress, ({ one }) => ({
  user: one(users, {
    fields: [userVideoProgress.userId],
    references: [users.id],
  }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  pack: one(learningPacks, {
    fields: [userAchievements.packId],
    references: [learningPacks.id],
  }),
}));

// Insert schemas
export const insertLearningPackSchema = createInsertSchema(learningPacks).omit({
  id: true,
  createdAt: true,
});

export const insertPackVideoSchema = createInsertSchema(packVideos).omit({
  id: true,
  createdAt: true,
});

export const insertGeneralVideoSchema = createInsertSchema(generalVideos).omit({
  id: true,
  createdAt: true,
});

export const insertUserPackProgressSchema = createInsertSchema(userPackProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserVideoProgressSchema = createInsertSchema(userVideoProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type LearningPack = typeof learningPacks.$inferSelect;
export type PackVideo = typeof packVideos.$inferSelect;
export type GeneralVideo = typeof generalVideos.$inferSelect;
export type UserPackProgress = typeof userPackProgress.$inferSelect;
export type UserVideoProgress = typeof userVideoProgress.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;

export type InsertLearningPack = z.infer<typeof insertLearningPackSchema>;
export type InsertPackVideo = z.infer<typeof insertPackVideoSchema>;
export type InsertGeneralVideo = z.infer<typeof insertGeneralVideoSchema>;
export type InsertUserPackProgress = z.infer<typeof insertUserPackProgressSchema>;
export type InsertUserVideoProgress = z.infer<typeof insertUserVideoProgressSchema>;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
