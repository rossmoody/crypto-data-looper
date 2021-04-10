function reformatDate(date: Date): string {
  const localeDate = date.toLocaleDateString()
  const [month, day, year] = localeDate.split("/")
  return `${day}-${month}-${year}`
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

/**
 * Returns an Array of dates in mm-dd-yyyy format
 * since the creation of Bitcoin (Jan 3rd 2009 / 03-01-2009) until current day.
 */
function makeDates(start: string, end: string): string[] {
  const arr: string[] = []

  const startDate = new Date(start)
  const endDate = new Date(end)

  while (startDate <= endDate) {
    arr.push(reformatDate(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }

  return arr.map(addLeadingZero)
}

export default makeDates
