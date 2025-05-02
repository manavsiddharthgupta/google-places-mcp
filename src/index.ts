import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { PlacesTextSearchParams } from "./schema.js"
import { performPlacesTextSearch } from "./helper.js"

class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = "HttpError"
  }
}

// Create server instance
const server = new McpServer({
  name: "google-places-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  "places_text_search",
  "Text search for places using Google Places API",
  PlacesTextSearchParams.shape,
  async (args, extra) => {
    const { fields, ...searchOptions } = args

    try {
      const data = await performPlacesTextSearch(searchOptions, fields)

      if (!data) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve places data",
            },
          ],
        }
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      }
    } catch (error) {
      console.error("Tool execution error:", error)

      return {
        content: [
          {
            type: "text",
            text:
              error instanceof HttpError
                ? `Error fetching places text search: ${error.message}`
                : "Google Places API error",
          },
        ],
        isError: true,
      }
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Google Text Search MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
