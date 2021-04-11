import makeDates from "./make-dates"
import getMarketIds from "./get-market-data"
import getPastPrice from "./get-past-price"
import database from "./firebase-database"

interface Coin {
  [date: string]: number
}

async function init(): Promise<void> {
  const TODAY = new Date().toLocaleDateString()
  const STOP_POINT = 45

  let index = 0

  const dates = makeDates("10-05-2013", TODAY)

  const coinIDs = await getMarketIds()

  for (const coinID of coinIDs) {
    const coinRef = database.ref("coins").child(coinID)

    let data: Coin | undefined = (await coinRef.once("value")).val()

    if (!data) data = {}

    const existingDates = Object.keys(data)

    const filteredDates = dates
      .filter(date => !existingDates.includes(date))
      .reverse()

    if (filteredDates.length) {
      for (const date of filteredDates) {
        if (index >= STOP_POINT) return

        const pastPrice = await getPastPrice(coinID, date)

        index++

        if (pastPrice === undefined) {
          return console.log(`${coinID} rate limited...`)
        }

        if (pastPrice === null) {
          console.log(`${index}: No prices before ${date} with ${coinID}`)
          break
        }

        if (pastPrice) {
          console.log(`#${index}: ${coinID} | ${date} | ${pastPrice}`)
          const dateRef = coinRef.child(date)
          dateRef.set(pastPrice)
        }
      }
    }

    console.log(`No more prices to get for ${coinID}...`)
  }

  console.log(`Gathered all the coin data available...`)
}

export default init
