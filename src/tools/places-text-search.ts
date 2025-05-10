import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { PlacesTextSearchParams } from "../lib/schema.js"
import { GooglePlacesHttpError, performPlacesTextSearch } from "../lib/helper.js"

export function registerPlacesTextSearchTools(server: McpServer) {
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
                    error instanceof GooglePlacesHttpError
                      ? `Error fetching places text search: ${error.message}`
                      : "Google Places API error",
                },
              ],
              isError: true,
            }
          }
        }
      )
}