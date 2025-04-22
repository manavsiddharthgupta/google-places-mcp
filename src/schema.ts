import { z } from "zod"

// Define the LocationBias schema
export const LocationBias = z.union([
  z.object({
    circle: z.object({
      center: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      radius: z.number().positive(),
    }),
  }),
  z.object({
    rectangle: z.object({
      low: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      high: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    }),
  }),
  z.object({
    ipBias: z.literal(true),
  }),
])

// Define the LocationRestriction schema
export const LocationRestriction = z.union([
  z.object({
    circle: z.object({
      center: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      radius: z.number().positive(),
    }),
  }),
  z.object({
    rectangle: z.object({
      low: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      high: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    }),
  }),
])

// Define the EvOptions schema
export const EvOptions = z.object({
  connectorTypes: z
    .array(
      z.enum([
        "CONNECTOR_TYPE_UNSPECIFIED",
        "J1772",
        "CCS_TYPE_1",
        "CCS_TYPE_2",
        "CHADEMO",
        "TESLA",
        "IEC_62196_TYPE_2",
        "IEC_60309",
      ])
    )
    .optional()
    .describe("Filter by EV connector types"),

  minimumChargerCount: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe("Minimum number of chargers at the location"),

  minimumKilowattRating: z
    .number()
    .positive()
    .optional()
    .describe("Minimum charger power in kilowatts"),
})

// Define the PlacesTextSearchParams schema
export const PlacesTextSearchParams = {
  textQuery: z
    .string()
    .min(1)
    .describe(
      "The text string on which to search, such as 'restaurant' or '123 Main Street'"
    ),

  includedType: z
    .string()
    .optional()
    .describe("Restricts results to places matching the specified type"),

  includePureServiceAreaBusinesses: z
    .boolean()
    .optional()
    .describe(
      "If true, includes businesses that visit or deliver to customers without a physical location"
    ),

  languageCode: z
    .string()
    .optional()
    .describe(
      "The language in which to return results (defaults to 'en' if not specified)"
    ),

  locationBias: LocationBias.optional().describe(
    "Specifies an area to search, serving as a bias for results"
  ),

  locationRestriction: LocationRestriction.optional().describe(
    "Specifies an area to search with results restricted to this area only"
  ),

  pageSize: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .describe("Number of results to display per page (between 1 and 20)"),

  pageToken: z
    .string()
    .optional()
    .describe("The nextPageToken from the previous page's response"),

  priceLevels: z
    .array(
      z.enum([
        "PRICE_LEVEL_INEXPENSIVE",
        "PRICE_LEVEL_MODERATE",
        "PRICE_LEVEL_EXPENSIVE",
        "PRICE_LEVEL_VERY_EXPENSIVE",
      ])
    )
    .optional()
    .describe("Restricts search to places at specified price levels"),

  rankPreference: z
    .enum(["RELEVANCE", "DISTANCE"])
    .optional()
    .describe("Specifies how results are ranked (by relevance or distance)"),

  regionCode: z
    .string()
    .length(2)
    .optional()
    .describe(
      "Two-character CLDR code to format the response and potentially bias results"
    ),

  strictTypeFiltering: z
    .boolean()
    .optional()
    .describe(
      "When true, only returns places that match the specified includedType"
    ),

  evOptions: EvOptions.optional().describe(
    "Parameters for filtering electric vehicle charging stations"
  ),

  minRating: z
    .number()
    .min(0)
    .max(5)
    .multipleOf(0.5)
    .optional()
    .describe(
      "Restricts results to places with an average user rating greater than or equal to this value"
    ),

  openNow: z
    .boolean()
    .optional()
    .describe(
      "If true, returns only places open for business at the time of the query"
    ),

  fields: z
    .array(z.string())
    .optional()
    .describe(
      "List of fields to return in the response (passed as $fields parameter or X-Goog-FieldMask header)"
    ),
}
