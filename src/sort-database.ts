import database from "./firebase-database"

interface DatePrice {
  date: string
  price: number
}

interface CoinObject {
  [key: string]: DatePrice[]
}

function formatDateToMDY(date: string): number {
  const [day, month, year] = date.split("-")

  return new Date(`${month}/${day}/${year}`).getTime()
}

function sortArray(array: DatePrice[]): DatePrice[] {
  return array.sort((a, b) => {
    return formatDateToMDY(b.date) - formatDateToMDY(a.date)
  })
}

function addLeadingZero(date: string): string {
  const dayMonthYear = date.split("-")

  const reformattedDayMonthYear = dayMonthYear.map(dmy => {
    if (dmy.length === 1) return `0${dmy}`
    return dmy
  })

  const [day, month, year] = reformattedDayMonthYear

  return `${day}-${month}-${year}`
}

function reduceArray(data: DatePrice[]): DatePrice[] {
  return data.reduce((acc: DatePrice[], current: DatePrice) => {
    const x: DatePrice | undefined = acc.find(
      item => item.date === current.date
    )

    if (!x) {
      return acc.concat([current])
    }

    if (x.price < current.price) {
      x.price = current.price
    }

    return acc
  }, [])
}

async function sortDatabase() {
  let sortedCoins: CoinObject = {}

  const coinRef = database.ref("coins")

  const coins: CoinObject = (await coinRef.once("value")).val()

  for (const [key, value] of Object.entries(coins)) {
    const formattedValue = value.map(obj => {
      obj.date = addLeadingZero(obj.date)
      return obj
    })

    const reducedPrices = reduceArray(formattedValue)

    sortedCoins[key] = sortArray(reducedPrices)
  }

  coinRef.set(sortedCoins)
}

export default sortDatabase
