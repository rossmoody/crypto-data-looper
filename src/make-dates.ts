function reformatDate(date: Date): string {
  const localeDate = date.toLocaleDateString()
  const [month, day, year] = localeDate.split("/")
  return `${day}-${month}-${year}`
}

/**
 * Returns an Array of dates in dd-mm-yyyy format
 * since the creation of Bitcoin (2009-01-03) until current day.
 */
function makeDates(start: string = "2009-01-03"): string[] {
  const arr: string[] = []

  let startDate = new Date(start)
  const endDate = new Date()

  while (startDate <= endDate) {
    arr.push(reformatDate(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }

  return arr
}

export default makeDates
