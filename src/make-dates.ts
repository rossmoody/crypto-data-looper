function reformatDate(date: Date): string {
  const localeDate = date.toLocaleDateString()
  const [month, day, year] = localeDate.split("/")
  return `${day}-${month}-${year}`
}

/**
 * Returns an Array of dates in mm-dd-yyyy format
 * since the creation of Bitcoin (Jan 3rd 2009 / 03-01-2009) until current day.
 */
function makeDates(start: string = "10-05-2009"): string[] {
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
