import makeDates from "./make-dates"
import getMarketIds from "./get-market-data"
import getPastPrice from "./get-past-price"
import database from "./firebase-database"

function filterDates(dates: string[], coins: CoinDataObject) {
  return dates.filter(date => {
    return !Object.values(coins).some(coin => coin.date === date)
  })
}

interface CoinDataObject {
  [key: string]: { date: string; price: number }
}

async function init(): Promise<void> {
  const BITCOIN_START_DATE = "10-05-2009"
  const TODAY = new Date().toLocaleDateString()
  const STOP_POINT = 40

  let index = 0

  const dates = makeDates(BITCOIN_START_DATE, TODAY)
  const coinIDs = await getMarketIds()

  for (const coinID of coinIDs) {
    const coinRef = database.ref("coins").child(coinID)

    let snapshot: CoinDataObject = (await coinRef.once("value")).val()

    if (!snapshot) snapshot = {}

    const filteredDates = filterDates(dates, snapshot).reverse()

    if (filteredDates.length) {
      for (const date of filteredDates) {
        if (index >= STOP_POINT) return

        const pastPrice = await getPastPrice(coinID, date)

        if (pastPrice !== undefined) {
          index++
          console.log(`#${index}: ${coinID} | ${date} | ${pastPrice}`)
          coinRef.push({ date: date, price: pastPrice })
        }

        if (pastPrice === 0) {
          const backstory = makeDates(BITCOIN_START_DATE, date)
          const validDates = filterDates(backstory, snapshot)

          for (const day of validDates) {
            coinRef.push({ date: day, price: 0 })
          }

          return console.log(`Filled out the backstory for ${coinID}`)
        }

        if (pastPrice === undefined) {
          return console.log("Rate limited...")
        }
      }
    }

    console.log(`No more prices to get for ${coinID}...`)
  }

  console.log(`Gathered all the coin data available...`)
}

export default init
