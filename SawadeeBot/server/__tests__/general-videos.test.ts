import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";

test("GET /api/general-videos/:id increments view count", async () => {
  let views = 0;
  const app = express();

  app.get("/api/general-videos/:id", (req, res) => {
    views += 1;
    res.json({ id: req.params.id, viewCount: views });
  });

  const server = app.listen(0);
  const port = (server.address() as any).port;

  await fetch(`http://localhost:${port}/api/general-videos/1`);
  assert.equal(views, 1);

  await fetch(`http://localhost:${port}/api/general-videos/1`);
  assert.equal(views, 2);

  server.close();
});

