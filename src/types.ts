export type ConnectorType =
  | "CONNECTOR_TYPE_UNSPECIFIED"
  | "J1772"
  | "CCS_TYPE_1"
  | "CCS_TYPE_2"
  | "CHADEMO"
  | "TESLA"
  | "IEC_62196_TYPE_2"
  | "IEC_60309"

export interface Circle {
  center: {
    latitude: number
    longitude: number
  }
  radius: number
}

export interface Rectangle {
  low: {
    latitude: number
    longitude: number
  }
  high: {
    latitude: number
    longitude: number
  }
}

export type LocationBias =
  | { circle: Circle }
  | { rectangle: Rectangle }
  | { ipBias: true }

export type LocationRestriction = { circle: Circle } | { rectangle: Rectangle }

export interface EvOptions {
  connectorTypes?: ConnectorType[]
  minimumChargerCount?: number
  minimumKilowattRating?: number
}

export type PriceLevel =
  | "PRICE_LEVEL_INEXPENSIVE"
  | "PRICE_LEVEL_MODERATE"
  | "PRICE_LEVEL_EXPENSIVE"
  | "PRICE_LEVEL_VERY_EXPENSIVE"

export type RankPreference = "RELEVANCE" | "DISTANCE"

export interface PlacesTextSearchParams {
  textQuery: string
  includedType?: string
  includePureServiceAreaBusinesses?: boolean
  languageCode?: string
  locationBias?: LocationBias
  locationRestriction?: LocationRestriction
  pageSize?: number
  pageToken?: string
  priceLevels?: PriceLevel[]
  rankPreference?: RankPreference
  regionCode?: string
  strictTypeFiltering?: boolean
  evOptions?: EvOptions
  minRating?: number
  openNow?: boolean
}
