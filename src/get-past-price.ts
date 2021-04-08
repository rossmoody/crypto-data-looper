import axios from "axios"

/**
 * Returns the past price of given coin. 0 if none is found
 */
async function getPastPrice(
  coin: string,
  date: string
): Promise<number | undefined> {
  const coingecko = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/coins",
    headers: {
      "Content-Type": "application/json"
    }
  })

  try {
    const { data } = await coingecko.get(`/${coin}/history?date=${date}`)

    if (!data.hasOwnProperty("market_data")) {
      console.log(`No price data for ${coin} on ${date}`)
      return 0
    }

    return data.market_data.current_price.usd
  } catch (error) {
    console.log(`Error getting data for ${coin} on ${date}`)
    return undefined
  }
}

export default getPastPrice
