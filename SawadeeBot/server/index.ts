import express from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { createClient } from "redis";

async function bootstrap() {
  const app = express();

  // proxy + body parser
  app.set("trust proxy", 1);
  app.use(express.json());

  // CORS
  const ORIGIN = process.env.CLIENT_ORIGIN ?? "https://<your-frontend-domain>";
  app.use(cors({ origin: ORIGIN, credentials: true }));

  // Redis client
  const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: { tls: true, keepAlive: 10_000 },
  });
  redisClient.on("error", (err) => console.error("Redis error:", err));
  await redisClient.connect();

  // Redis store
  const RedisStore = connectRedis(session);
  app.use(
    session({
      name: "sid",
      store: new RedisStore({ client: redisClient, prefix: "sess:" }),
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  // Routes
  app.post("/api/login", (req, res) => {
    (req.session as any).user = { id: "123", email: "demo@example.com" };
    res.json({ ok: true });
  });

  app.get("/api/auth/user", (req, res) => {
    const user = (req.session as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.json(user);
  });

  const port = Number(process.env.PORT) || 10000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

bootstrap().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
