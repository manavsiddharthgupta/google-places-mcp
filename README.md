# Google Places MCP Server

This MCP server integrates with Google Places API to allow searching, retrieving details, and finding nearby places.

## Components

### Tools

- [x] **places-text-search**

  - Text search for places using Google Places API
  - Input:
    - `textQuery` (string, required): The text query to search for places
    - `languageCode` (string, optional): Language code for results (e.g., "en")
    - `maxResultCount` (number, optional): Maximum number of results to return
    - `locationBias` (object, optional): Bias results toward this location
    - `locationRestriction` (object, optional): Restrict results to this location
    - `minRating` (number, optional): Minimum rating filter
    - `openNow` (boolean, optional): Filter for places that are currently open
    - `priceLevels` (array, optional): Filter by price levels
    - `rankPreference` (string, optional): Preference for ranking results
    - `regionCode` (string, optional): Country/region code (e.g., "us")
    - `fields` (array, optional): Specific fields to include in the response
  - Returns matching places with details

- [ ] **places-nearby-search**

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

- [ ] **place-details**

  - Get detailed information about a specific place
  - Input:
    - `placeId` (string, required): Google Place ID
    - `fields` (array, optional): Specific fields to include in the response
    - `languageCode` (string, optional): Language code for results
  - Returns comprehensive details about the place

- [ ] **place-autocomplete**

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

- [ ] **place-photo**
  - Retrieve photos for a place
  - Input:
    - `photoReference` (string, required): Reference from a Place Details response
    - `maxWidth` (number, optional): Maximum width of the returned image
    - `maxHeight` (number, optional): Maximum height of the returned image
  - Returns photo data or URL
