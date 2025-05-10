import express from "express";
import type { Express } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { setupTransport, getTransport } from "./transport.js";

export function createExpressApp(server: McpServer): Express {
  const app = express();

  // SSE endpoint
  app.get("/sse", async (req, res) => {
    const transport = setupTransport(res);
    await server.connect(transport);
  });

  // Message endpoint
  app.post("/messages", async (req, res) => {
    const transport = getTransport();
    if (!transport) {
      res.status(400).json({ error: "No transport" });
      return;
    }
    await transport.handlePostMessage(req, res);
  });

  return app;
}