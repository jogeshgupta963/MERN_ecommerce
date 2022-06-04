import Order from '../models/Order.js'

//@desc   Create new order
//@route  POST /order
//@access Private
async function createNewOrder(req, res) {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      throw new Error('No Order items')
      return
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.json(err.message)
  }
}

export { createNewOrder }
