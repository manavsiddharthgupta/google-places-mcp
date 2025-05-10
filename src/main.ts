import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlacesTools } from "./tools/index.js";
import { createExpressApp } from "./app.js";


const server = new McpServer({
  name: "google-places-mcp",
  version: "1.0.0",
  // capabilities: {
  //   resources: {},
  //   tools: {},
  // },
});


registerPlacesTools(server);


const app = createExpressApp(server);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});