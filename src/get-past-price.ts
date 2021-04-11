import axios from "axios"

/**
 * Returns the past price of given coin.
 * If none exists it returns null.
 * If it's rate limited it returns undefined.
 */
async function getPastPrice(
  coin: string,
  date: string
): Promise<number | undefined | null> {
  const coingecko = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/coins",
    headers: {
      "Content-Type": "application/json"
    }
  })

  try {
    const { data } = await coingecko.get(`/${coin}/history?date=${date}`)

    if (!data.hasOwnProperty("market_data")) {
      return null
    }

    return data.market_data.current_price.usd
  } catch (error) {
    console.log(`Error getting data for ${coin} on ${date}`)
    return undefined
  }
}

export default getPastPrice
