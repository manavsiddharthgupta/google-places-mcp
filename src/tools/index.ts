import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlacesTextSearchTools } from "./places-text-search.js";

export function registerPlacesTools(server: McpServer) {
  registerPlacesTextSearchTools(server);
}