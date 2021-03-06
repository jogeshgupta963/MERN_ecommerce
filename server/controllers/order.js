import Order from '../models/Order.js'
import Stripe from 'stripe'
import 'dotenv/config'
const stripe = new Stripe(process.env.secretKey)
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
//@desc   Get  order by id
//@route  GET /orders/:id
//@access Private
async function getOrderById(req, res) {
  try {
    const { id } = req.params
    // const order = await Order.find(id).populate('user', 'name email')
    const order = await Order.findById(id).populate('user', 'name email')
    if (!order) throw new Error('Order not found')
    res.json(order)
  } catch (err) {
    res.json(err.message)
  }
}

//@desc  update order to paid
//@route  PUT /orders/:id/pay
//@access Private

async function updateOrderToPaid(req, res) {
  try {
    const { id } = req.params
    const order = await Order.findById(id)
    if (!order) throw new Error('Order not found')
    order.isPaid = true
    order.paidAt = Date.now()

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    await order.save()
    res.json(order)
  } catch (err) {
    res.json(err.message)
  }
}

async function payment(req, res) {
  try {
    let order = await Order.findById(req.params.id)
    let line_items = order.orderItems.map((item) => {
      return {
        // name: item.name,
        price: item.product,
        quantity: item.qty,
      }
    })
    // const session = await stripe.checkout.sessions.create({
    //   customer_email: req.user.email,
    //   client_reference_id: req.params.id,
    //   line_items,
    //   mode: 'payment',
    //   success_url: `${req.protocol}://${req.get('host')}/profile`,
    //   cancel_url: `${req.protocol}://${req.get('host')}/profile`,
    // })
    res.json(line_items)
  } catch (err) {
    res.json(err.message)
  }
}
export { createNewOrder, getOrderById, updateOrderToPaid, payment }
