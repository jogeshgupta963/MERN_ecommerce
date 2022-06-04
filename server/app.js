import express from 'express'
import cookieParser from 'cookie-parser'
import { connect } from './database/db.js'
import cors from 'cors'
// require('dotenv').config();
import 'dotenv/config'
const app = express()
import { router as products } from './routes/products.js'
import { router as user } from './routes/user.js'
import { router as order } from './routes/order.js'
import { notFound, errorHandle } from './middlewares/error.js'
//use
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use('/products', products)
app.use('/user', user)
app.use('/order', order)

app.use(notFound)
app.use(errorHandle)
;(async function () {
  try {
    await connect(process.env.MONGO_URI)
    console.log('DB connected')
    app.listen(process.env.PORT || 3001, () => console.log('Server started'))
  } catch (err) {
    console.log(err.message)
  }
})()
