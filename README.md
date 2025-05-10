# Google Places MCP Server

This MCP server integrates with Google Places API to allow searching, retrieving details, and finding nearby places.

## Setup

### Environment Variables

The following environment variables are required:

- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key with Places API access enabled
- `TRANSPORT_TYPE`: Transport method to use (`stdio` or `sse`)
- `PORT`: (Optional) Port number for SSE transport (default: 3000)

Create a `.env` file in the root directory with these variables:

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
TRANSPORT_TYPE=stdio
PORT=3000
```

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Transport Options

The server supports two transport methods:

1. **stdio** (default): Uses standard input/output for communication
2. **SSE (Server-Sent Events)**: Uses HTTP with Server-Sent Events for real-time communication

When using SSE transport, the server exposes two endpoints:
- `GET /sse`: SSE endpoint for receiving server messages
- `POST /messages`: Endpoint for sending messages to the server

### Tools

- [x] **places-text-search**

  - Text search for places using Google Places API
  - Input:
    - `textQuery` (string, required): The text query to search for places
    - `includedType` (string, optional): Restricts results to places matching the specified type
    - `includePureServiceAreaBusinesses` (boolean, optional): Include businesses without physical location
    - `languageCode` (string, optional): Language code for results (e.g., "en")
    - `locationBias` (object, optional): Bias results toward this location
    - `locationRestriction` (object, optional): Restrict results to this location
    - `pageSize` (number, optional): Number of results per page (1-20)
    - `pageToken` (string, optional): Token for next page of results
    - `priceLevels` (array, optional): Filter by price levels
    - `rankPreference` (string, optional): Rank by "RELEVANCE" or "DISTANCE"
    - `regionCode` (string, optional): Two-character country/region code
    - `strictTypeFiltering` (boolean, optional): Only return exact type matches
    - `evOptions` (object, optional): EV charging station filters
    - `minRating` (number, optional): Minimum rating filter (0-5)
    - `openNow` (boolean, optional): Filter for places currently open
    - `fields` (array, optional): Specific fields to include in response
  - Returns matching places with details

- [ ] **places-nearby-search** (Coming Soon)

  - Find places near a specific location
  - Input:
    - `location` (object, required): Latitude and longitude coordinates
    - `radius` (number, optional): Search radius in meters
    - `keyword` (string, optional): Keyword to filter results
    - `type` (string, optional): Place type to filter results
    - `rankBy` (string, optional): Rank by "prominence" or "distance"
    - `openNow` (boolean, optional): Filter for places that are currently open
    - `fields` (array, optional): Specific fields to include in the response
  - Returns nearby places with details

- [ ] **place-details** (Coming Soon)

  - Get detailed information about a specific place
  - Input:
    - `placeId` (string, required): Google Place ID
    - `fields` (array, optional): Specific fields to include in the response
    - `languageCode` (string, optional): Language code for results
  - Returns comprehensive details about the place

- [ ] **place-autocomplete** (Coming Soon)

  - Get place predictions based on user input
  - Input:
    - `input` (string, required): User input text
    - `sessionToken` (string, optional): Session token for billing
    - `offset` (number, optional): Position in the input where autocomplete started
    - `origin` (object, optional): Origin point for distance ranking
    - `locationBias` (object, optional): Bias results toward this location
    - `locationRestriction` (object, optional): Restrict results to this location
    - `types` (array, optional): Types of place results
  - Returns place predictions

- [ ] **place-photo** (Coming Soon)
  - Retrieve photos for a place
  - Input:
    - `photoReference` (string, required): Reference from a Place Details response
    - `maxWidth` (number, optional): Maximum width of the returned image
    - `maxHeight` (number, optional): Maximum height of the returned image
  - Returns photo data or URL
