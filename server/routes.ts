import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerEmailRoute } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Email notification route
  registerEmailRoute(app);

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
