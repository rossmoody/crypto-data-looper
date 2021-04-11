import database from "./firebase-database"

interface DatePriceObject {
  date: string
  price: number
}

function addLeadingZero(obj: DatePriceObject): DatePriceObject {
  const dayMonthYear = obj.date.split("-")

  const reformattedDayMonthYear = dayMonthYear.map(dmy => {
    if (dmy.length === 1) return `0${dmy}`
    return dmy
  })

  const [day, month, year] = reformattedDayMonthYear

  obj.date = `${day}-${month}-${year}`

  return obj
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

  const coinsList: string[] = Object.keys((await coinRef.once("value")).val())

  for (const coinID of coinsList) {
    let childCoin = coinRef.child(coinID)

    childCoin.once("value", snapshot => {
      let data: DatePriceObject[] = Object.values(snapshot.val())

      childCoin.set({})

      console.log(`Pushing item to ${coinID}...`)

      data
        .filter((obj: DatePriceObject) => obj.price != 0)
        .reduce(eliminateDuplicates, [])
        .sort(sortDescending)
        .map(addLeadingZero)
        .forEach(coin => childCoin.push(coin))

      console.log(`Finished pushing to ${coinID}...`)
    })
  }
}

export default sortDatabase
