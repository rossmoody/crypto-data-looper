import axios from "axios"

/**
 * Returns an Array of coin Objects that outline all available coins for the current day.
 */
async function getMarketData(): Promise<string[]> {
  const coingecko = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/coins",
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log("Fetching todays market data...")

  try {
    const coinCount = 250
    const { data } = await coingecko.get(
      `/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinCount}&page=1&sparkline=false`
    )

    console.log("Successfully fetched market data")

    return data.map((coin: any) => coin.id)
  } catch (error) {
    throw error
  }
}

export default getMarketData
