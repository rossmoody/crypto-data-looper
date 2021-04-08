import makeDates from "./make-dates"
import getMarketData from "./get-market-data"
import getPastPrice from "./get-past-price"
import database from "./firebase-database"

function log(string: string) {
  console.log(string)
}

function filterDates(dates: string[], coins: Coin[]) {
  return dates.filter(date => !coins.some(coin => coin.date === date))
}

interface Coin {
  date: string
  price: number
}

async function init(): Promise<void> {
  let index = 0
  const stopPoint = 25

  const dates = makeDates()

  const coins = await getMarketData()

  for (const coin of coins) {
    const coinRef = database.ref("coins").child(coin)

    let snapshot = (await coinRef.once("value")).val()

    if (!snapshot) snapshot = []

    const filteredDates = filterDates(dates, snapshot)

    if (filteredDates.length) {
      for (const date of filteredDates) {
        if (index >= stopPoint) return log("Successfully updated database")

        const pastPrice = await getPastPrice(coin, date)
        index++

        if (pastPrice !== undefined) {
          snapshot = [...snapshot, { date: date, price: pastPrice }]
          log(`${index}: ${coin} on ${date} at ${pastPrice}`)
          coinRef.set(snapshot)
        }
      }
    }
  }

  log("No more coins to get for now...")
}

export default init
