export const GMT = (date) => {
  // Observe the numerical value of the date.
  date.valueOf()

  // Try out the incorrectly "converted" date string.
  return new Date(date.valueOf() + date.getTimezoneOffset() * -60000)
  // Sat Jan 28 2017 00:16:35 GMT-0600 (CST)
}
