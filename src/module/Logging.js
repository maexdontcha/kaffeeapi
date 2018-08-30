class Logging {
  constructor (item) {
    this.elements = []
  }
  add (order) {
    this.elements.push(order)
  }
}

export const LoggingModul = new Logging()
