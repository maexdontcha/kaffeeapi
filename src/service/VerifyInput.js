import { CoffeeDuration } from './StaticData'

export const VerifyInput = (Order, cb) => {
  if (Order.deliveryDate.toString() === 'Invalid Date') {
    cb(new Error('Invalid Date'))
  } else if (isNaN(Order.productID) || !CoffeeDuration.find(item => item.id === Order.productID)) {
    cb(new Error('No productID matched'))
  } else {
    cb(null, true)
  }
}
