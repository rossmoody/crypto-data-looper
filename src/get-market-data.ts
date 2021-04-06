import axios from "axios"

interface MarketData {
  id: string
}

/**
 * Returns an Array of coin Objects that outline all available coins for the current day.
 */
async function getMarketData(): Promise<MarketData[]> {
  const coingecko = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/coins",
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log("Fetching todays market data...")

  try {
    const { data }: { data: MarketData[] } = await coingecko.get(
      "/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
    return data
  } catch (error) {
    throw error
  }
}

export default getMarketData
