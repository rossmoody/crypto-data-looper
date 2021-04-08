import database from "./firebase-database"

interface DatePrice {
  date: string
  price: number
}

interface CoinObject {
  [key: string]: DatePrice[]
}

async function sortDatabase() {
  const coinRef = database.ref("coins")

  const coins: CoinObject = (await coinRef.once("value")).val()

  function formatDate(date: string): number {
    const [day, month, year] = date.split("-")

    return new Date(`${month}/${day}/${year}`).getTime()
  }

  function sortArray(array: DatePrice[]): DatePrice[] {
    return array.sort((a, b) => {
      return formatDate(b.date) - formatDate(a.date)
    })
  }

  let sortedCoins: CoinObject = {}

  for (const [key, value] of Object.entries(coins)) {
    sortedCoins[key] = sortArray(value)
  }

  coinRef.set(sortedCoins)
}

export default sortDatabase
