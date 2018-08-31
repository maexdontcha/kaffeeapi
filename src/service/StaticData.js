// Zeiten wie lange die jeweiligen Kaffen brauchen
export const CoffeeDuration = {
  1: 45, // Espresso
  2: 55, // CaffeeCrema
  3: 44, // CaffeeCrema
  4: 30 // CaffeeCrema
}

// Maschienen Stati
export const MaschineStates = {
  run: 'isRunning',
  ready: 'ready',
  error: 'error'
}

export const entryScreen = () => {
  console.log(' ______________________________________________________________')
  console.log('|                                                             |')
  console.log('|        )  (           API is running on                     |')
  console.log('|       (   ) )         http://localhost:9000                 |')
  console.log('|        ) ( (                                                |')
  console.log('|      _______)_        Deamon is running                     |')
  console.log('|   .-"---------|       Check Queue in interval 1000ms        |')
  console.log('|  ( C|/\\/\\/\\/\\/|       tryOrderBeverage in interval 3000ms   |')
  console.log('|   "-./\\/\\/\\/\\/|                                             |')
  console.log('|     "_________"                                             |')
  console.log('|      "-------"        Createt by Philipp and Max            |')
  console.log('|                                                             |')
  console.log('|_____________________________________________________________|')
}
