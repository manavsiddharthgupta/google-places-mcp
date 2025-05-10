import axios from "axios"
import { PlacesTextSearchParams } from "./types.js"

export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = "HttpError"
  }
}

export async function performPlacesTextSearch(
  options: PlacesTextSearchParams,
  fields?: string[]
) {
  const url = new URL("https://places.googleapis.com/v1/places:searchText")

  if (options.regionCode) {
    url.searchParams.append("regionCode", options.regionCode)
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    throw new HttpError(500, "Google Maps API key not configured")
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
  }

  const fieldMask = Array.isArray(fields) ? fields.join(",") : undefined
  if (fieldMask) {
    headers["X-Goog-FieldMask"] = fieldMask
  }

  try {
    const response = await axios.post(url.toString(), options, { headers })
    return response.data
  } catch (error) {
    console.error("Places Text Search Error:", error)
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message || error.message
      throw new HttpError(error.response?.status || 500, message)
    }
    throw new HttpError(500, "Google Places API error")
  }
}

export class GooglePlacesHttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = "GooglePlacesHttpError"
  }
}