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
app.use('/orders', order)

app.use(notFound)
app.use(errorHandle)
;(async function () {
  try {
    await connect(process.env.MONGO_URI)
    console.log('DB connected')
    var port = process.env.PORT || 3001
    app.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (err) {
    console.log(err.message)
  }
})()
