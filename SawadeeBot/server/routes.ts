import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { 
  insertLearningPackSchema,
  insertPackVideoSchema,
  insertGeneralVideoSchema,
  insertUserPackProgressSchema,
  insertUserVideoProgressSchema,
  insertUserAchievementSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Learning packs routes
  app.get('/api/learning-packs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const packs = await storage.getLearningPacks();
      const userProgress = await storage.getUserPackProgress(userId);
      // Precompute map for O(1) pack order lookups instead of O(n) searches
      const packOrderMap = new Map(packs.map(p => [p.id, p.order]));

      const packsWithProgress = packs.map(pack => {
        const progress = userProgress.find(p => p.packId === pack.id);
        return {
          ...pack,
          userProgress: progress,
          isUnlocked: pack.order === 1 || userProgress.some(p =>
            p.isCompleted &&
            // O(1) lookup using precomputed map instead of O(n) find
            packOrderMap.get(p.packId) === pack.order - 1
          ),
        };
      });

      res.json(packsWithProgress);
    } catch (error) {
      console.error("Error fetching learning packs:", error);
      res.status(500).json({ message: "Failed to fetch learning packs" });
    }
  });

  app.get('/api/learning-packs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      const pack = await storage.getLearningPack(id);
      if (!pack) {
        return res.status(404).json({ message: "Learning pack not found" });
      }

      const videos = await storage.getPackVideos(id);
      const progress = await storage.getUserPackProgressByPack(userId, id);

      res.json({
        ...pack,
        videos,
        userProgress: progress,
      });
    } catch (error) {
      console.error("Error fetching learning pack:", error);
      res.status(500).json({ message: "Failed to fetch learning pack" });
    }
  });

  app.post('/api/learning-packs', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLearningPackSchema.parse(req.body);
      const pack = await storage.createLearningPack(validatedData);
      res.json(pack);
    } catch (error) {
      console.error("Error creating learning pack:", error);
      res.status(500).json({ message: "Failed to create learning pack" });
    }
  });

  app.post('/api/learning-packs/:packId/videos', isAuthenticated, async (req, res) => {
    try {
      const { packId } = req.params;
      const validatedData = insertPackVideoSchema.parse({ ...req.body, packId });
      const video = await storage.createPackVideo(validatedData);
      res.json(video);
    } catch (error) {
      console.error("Error creating pack video:", error);
      res.status(500).json({ message: "Failed to create pack video" });
    }
  });

  // General content routes
  app.get('/api/general-videos', isAuthenticated, async (req, res) => {
    try {
      const { category, position, search } = req.query;
      const videos = await storage.getGeneralVideos(
        category as string,
        position as string,
        search as string
      );
      res.json(videos);
    } catch (error) {
      console.error("Error fetching general videos:", error);
      res.status(500).json({ message: "Failed to fetch general videos" });
    }
  });

  app.get('/api/general-videos/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getGeneralVideo(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      // Increment view count
      await storage.incrementViewCount(id);
      
      res.json(video);
    } catch (error) {
      console.error("Error fetching general video:", error);
      res.status(500).json({ message: "Failed to fetch general video" });
    }
  });

  app.post('/api/general-videos', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertGeneralVideoSchema.parse(req.body);
      const video = await storage.createGeneralVideo(validatedData);
      res.json(video);
    } catch (error) {
      console.error("Error creating general video:", error);
      res.status(500).json({ message: "Failed to create general video" });
    }
  });

  // Progress tracking routes
  app.post('/api/progress/pack', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertUserPackProgressSchema.parse({ 
        ...req.body, 
        userId 
      });
      
      const progress = await storage.updateUserPackProgress(validatedData);
      
      // Check if pack is completed and award achievement
      if (progress.isCompleted) {
        const pack = await storage.getLearningPack(progress.packId);
        if (pack) {
          await storage.createUserAchievement({
            userId,
            packId: pack.id,
            type: "pack_completion",
            title: `เรียนจบ ${pack.title}`,
            description: `คุณได้เรียนจบ ${pack.title} เรียบร้อยแล้ว`,
          });
        }
      }
      
      res.json(progress);
    } catch (error) {
      console.error("Error updating pack progress:", error);
      res.status(500).json({ message: "Failed to update pack progress" });
    }
  });

  app.post('/api/progress/video', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertUserVideoProgressSchema.parse({ 
        ...req.body, 
        userId 
      });
      
      const progress = await storage.updateUserVideoProgress(validatedData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating video progress:", error);
      res.status(500).json({ message: "Failed to update video progress" });
    }
  });

  // User dashboard data
  app.get('/api/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const dashboardData = await storage.getUserDashboardData(userId);
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // User achievements
  app.get('/api/achievements', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
