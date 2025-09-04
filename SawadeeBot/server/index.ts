import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";
import RedisStoreFactory from "connect-redis";
import { Redis } from "ioredis";
import passport from "passport";
import path from "path";
import authRouter from "./auth";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());

// อนุญาต cross-origin
const ORIGIN = process.env.CLIENT_ORIGIN || "https://<frontend-domain>";
app.use(cors({ origin: ORIGIN, credentials: true }));

// ใช้ Redis store จาก Upstash
const redis = new Redis(process.env.REDIS_URL);
const RedisStore = RedisStoreFactory(session);

app.use(
  session({
    name: "sid",
    store: new RedisStore({ client: redis, prefix: "sess:" }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 วัน
      secure: true,     // ใช้ HTTPS → ต้อง true
      sameSite: "none", // ถ้าข้ามโดเมน
    },
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

const staticDir = path.join(process.cwd(), "dist", "public");

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    app.use(express.static(staticDir));
  }

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
