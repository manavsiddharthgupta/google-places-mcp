import type { Response } from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

let transport: SSEServerTransport | undefined = undefined;

export function setupTransport(res: Response) {
  transport = new SSEServerTransport("/messages", res);
  return transport;
}

export function getTransport() {
  return transport;
}