import database from "./firebase-database"

interface DatePriceObject {
  date: string
  price: number
}

interface DatePriceObjWithKey {
  [key: string]: DatePriceObject
}

interface CoinsList {
  [key: string]: DatePriceObjWithKey
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

function eliminateDuplicates(acc: DatePriceObject[], current: DatePriceObject) {
  const x: DatePriceObject | undefined = acc.find(
    item => item.date === current.date
  )

  if (!x) {
    return acc.concat([current])
  }

  if (x.price < current.price) {
    x.price = current.price
  }

  return acc
}

function formatDateToMDY(date: string): number {
  const [day, month, year] = date.split("-")

  return new Date(`${month}/${day}/${year}`).getTime()
}

function sortDescending(a: DatePriceObject, b: DatePriceObject) {
  return formatDateToMDY(b.date) - formatDateToMDY(a.date)
}

async function sortDatabase() {
  const coinRef = database.ref("coins")

  const coinsList: CoinsList = (await coinRef.once("value")).val()

  for (const [coinName, coinValue] of Object.entries(coinsList)) {
    const coinData = Object.values(coinValue)
      .reduce(eliminateDuplicates, [])
      .sort(sortDescending)

    coinRef.child(coinName).set({})

    for (const datePriceObj of coinData) {
      datePriceObj.date = addLeadingZero(datePriceObj.date)
      coinRef.child(coinName).push(datePriceObj)
    }
  }
}

export default sortDatabase
