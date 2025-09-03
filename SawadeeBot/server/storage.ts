import {
  users,
  learningPacks,
  packVideos,
  generalVideos,
  userPackProgress,
  userVideoProgress,
  userAchievements,
  type User,
  type UpsertUser,
  type LearningPack,
  type PackVideo,
  type GeneralVideo,
  type UserPackProgress,
  type UserVideoProgress,
  type UserAchievement,
  type InsertLearningPack,
  type InsertPackVideo,
  type InsertGeneralVideo,
  type InsertUserPackProgress,
  type InsertUserVideoProgress,
  type InsertUserAchievement,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for OAuth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Learning pack operations
  getLearningPacks(): Promise<LearningPack[]>;
  getLearningPack(id: string): Promise<LearningPack | undefined>;
  getPackVideos(packId: string): Promise<PackVideo[]>;
  createLearningPack(pack: InsertLearningPack): Promise<LearningPack>;
  createPackVideo(video: InsertPackVideo): Promise<PackVideo>;
  
  // General content operations
  getGeneralVideos(category?: string, position?: string, search?: string): Promise<GeneralVideo[]>;
  getGeneralVideo(id: string): Promise<GeneralVideo | undefined>;
  createGeneralVideo(video: InsertGeneralVideo): Promise<GeneralVideo>;
  incrementViewCount(videoId: string): Promise<void>;
  
  // User progress operations
  getUserPackProgress(userId: string): Promise<UserPackProgress[]>;
  getUserPackProgressByPack(userId: string, packId: string): Promise<UserPackProgress | undefined>;
  updateUserPackProgress(progress: InsertUserPackProgress): Promise<UserPackProgress>;
  
  getUserVideoProgress(userId: string, videoId: string, videoType: string): Promise<UserVideoProgress | undefined>;
  updateUserVideoProgress(progress: InsertUserVideoProgress): Promise<UserVideoProgress>;
  getUserCompletedVideosCount(userId: string): Promise<number>;
  
  // Achievement operations
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
  
  // Dashboard data
  getUserDashboardData(userId: string): Promise<{
    completedPacks: number;
    totalVideosWatched: number;
    learningHours: number;
    weeklyProgress: {
      videosWatched: number;
      hoursLearned: number;
      packsCompleted: number;
      streak: number;
    };
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Learning pack operations
  async getLearningPacks(): Promise<LearningPack[]> {
    return await db.select().from(learningPacks).orderBy(asc(learningPacks.order));
  }

  async getLearningPack(id: string): Promise<LearningPack | undefined> {
    const [pack] = await db.select().from(learningPacks).where(eq(learningPacks.id, id));
    return pack;
  }

  async getPackVideos(packId: string): Promise<PackVideo[]> {
    return await db
      .select()
      .from(packVideos)
      .where(eq(packVideos.packId, packId))
      .orderBy(asc(packVideos.order));
  }

  async createLearningPack(pack: InsertLearningPack): Promise<LearningPack> {
    const [created] = await db.insert(learningPacks).values(pack).returning();
    return created;
  }

  async createPackVideo(video: InsertPackVideo): Promise<PackVideo> {
    const [created] = await db.insert(packVideos).values(video).returning();
    return created;
  }

  // General content operations
  async getGeneralVideos(category?: string, position?: string, search?: string): Promise<GeneralVideo[]> {
    const conditions = [];
    if (category) {
      conditions.push(eq(generalVideos.category, category));
    }
    if (position) {
      conditions.push(eq(generalVideos.targetPosition, position));
    }
    if (search) {
      conditions.push(sql`${generalVideos.title} ILIKE ${`%${search}%`} OR ${generalVideos.description} ILIKE ${`%${search}%`}`);
    }
    
    let query: any = db.select().from(generalVideos);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    return await query.orderBy(desc(generalVideos.viewCount));
  }

  async getGeneralVideo(id: string): Promise<GeneralVideo | undefined> {
    const [video] = await db.select().from(generalVideos).where(eq(generalVideos.id, id));
    return video;
  }

  async createGeneralVideo(video: InsertGeneralVideo): Promise<GeneralVideo> {
    const [created] = await db.insert(generalVideos).values(video).returning();
    return created;
  }

  async incrementViewCount(videoId: string): Promise<void> {
    await db
      .update(generalVideos)
      .set({ viewCount: sql`${generalVideos.viewCount} + 1` })
      .where(eq(generalVideos.id, videoId));
  }

  // User progress operations
  async getUserPackProgress(userId: string): Promise<UserPackProgress[]> {
    return await db
      .select()
      .from(userPackProgress)
      .where(eq(userPackProgress.userId, userId));
  }

  async getUserPackProgressByPack(userId: string, packId: string): Promise<UserPackProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userPackProgress)
      .where(
        and(
          eq(userPackProgress.userId, userId),
          eq(userPackProgress.packId, packId)
        )
      );
    return progress;
  }

  async updateUserPackProgress(progress: InsertUserPackProgress): Promise<UserPackProgress> {
    const existing = await this.getUserPackProgressByPack(progress.userId, progress.packId);
    
    if (existing) {
      const [updated] = await db
        .update(userPackProgress)
        .set({
          ...progress,
          updatedAt: new Date(),
        })
        .where(eq(userPackProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userPackProgress)
        .values(progress)
        .returning();
      return created;
    }
  }

  async getUserVideoProgress(userId: string, videoId: string, videoType: string): Promise<UserVideoProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userVideoProgress)
      .where(
        and(
          eq(userVideoProgress.userId, userId),
          eq(userVideoProgress.videoId, videoId),
          eq(userVideoProgress.videoType, videoType)
        )
      );
    return progress;
  }

  async updateUserVideoProgress(progress: InsertUserVideoProgress): Promise<UserVideoProgress> {
    const existing = await this.getUserVideoProgress(progress.userId, progress.videoId, progress.videoType);
    
    if (existing) {
      const [updated] = await db
        .update(userVideoProgress)
        .set({
          ...progress,
          updatedAt: new Date(),
        })
        .where(eq(userVideoProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userVideoProgress)
        .values(progress)
        .returning();
      return created;
    }
  }

  async getUserCompletedVideosCount(userId: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(userVideoProgress)
      .where(
        and(
          eq(userVideoProgress.userId, userId),
          eq(userVideoProgress.isCompleted, true)
        )
      );
    return result.count;
  }

  // Achievement operations
  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));
  }

  async createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const [created] = await db.insert(userAchievements).values(achievement).returning();
    return created;
  }

  // Dashboard data
  async getUserDashboardData(userId: string): Promise<{
    completedPacks: number;
    totalVideosWatched: number;
    learningHours: number;
    weeklyProgress: {
      videosWatched: number;
      hoursLearned: number;
      packsCompleted: number;
      streak: number;
    };
  }> {
    const completedPacksResult = await db
      .select({ count: count() })
      .from(userPackProgress)
      .where(
        and(
          eq(userPackProgress.userId, userId),
          eq(userPackProgress.isCompleted, true)
        )
      );

    const totalVideosResult = await db
      .select({ count: count() })
      .from(userVideoProgress)
      .where(
        and(
          eq(userVideoProgress.userId, userId),
          eq(userVideoProgress.isCompleted, true)
        )
      );

    const learningHoursResult = await db
      .select({ 
        totalDuration: sql<number>`SUM(${userVideoProgress.watchedDuration})`
      })
      .from(userVideoProgress)
      .where(eq(userVideoProgress.userId, userId));

    // Calculate weekly progress (simplified - would need more complex logic for real streak calculation)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyVideosResult = await db
      .select({ count: count() })
      .from(userVideoProgress)
      .where(
        and(
          eq(userVideoProgress.userId, userId),
          eq(userVideoProgress.isCompleted, true),
          sql`${userVideoProgress.completedAt} >= ${weekAgo}`
        )
      );

    const weeklyPacksResult = await db
      .select({ count: count() })
      .from(userPackProgress)
      .where(
        and(
          eq(userPackProgress.userId, userId),
          eq(userPackProgress.isCompleted, true),
          sql`${userPackProgress.completedAt} >= ${weekAgo}`
        )
      );

    const totalSeconds = learningHoursResult[0]?.totalDuration || 0;
    const learningHours = Math.round(totalSeconds / 3600 * 10) / 10;
    const weeklyHoursResult = await db
      .select({
        totalDuration: sql<number>`SUM(${userVideoProgress.watchedDuration})`
      })
      .from(userVideoProgress)
      .where(
        and(
          eq(userVideoProgress.userId, userId),
          sql`${userVideoProgress.completedAt} >= ${weekAgo}`
        )
      );

    const weeklySeconds = weeklyHoursResult[0]?.totalDuration || 0;
    const weeklyHours = Math.round(weeklySeconds / 3600 * 10) / 10;

    return {
      completedPacks: completedPacksResult[0].count,
      totalVideosWatched: totalVideosResult[0].count,
      learningHours,
      weeklyProgress: {
        videosWatched: weeklyVideosResult[0].count,
        hoursLearned: weeklyHours,
        packsCompleted: weeklyPacksResult[0].count,
        streak: 7, // Simplified - would need proper streak calculation
      },
    };
  }
}

export const storage = new DatabaseStorage();
