function getOrdinalSuffix(day: number) {
  if (day % 10 === 1 && day !== 11) return 'st'
  if (day % 10 === 2 && day !== 12) return 'nd'
  if (day % 10 === 3 && day !== 13) return 'rd'
  return 'th'
}

export function renderDate(date: Date) {
  if (!date) return ''
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const currentYear = new Date().getFullYear()

  // If the year of the given date is not the current year, append the year to the output
  const yearOutput = year !== currentYear ? ` ${year}` : ''

  return `${month} ${day}${getOrdinalSuffix(day)}${yearOutput} ${hours}:${minutes}`
}
