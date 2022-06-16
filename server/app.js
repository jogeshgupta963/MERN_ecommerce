import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connect } from './database/db.js'
import cors from 'cors'
// require('dotenv').config();
import 'dotenv/config'

import { router as products } from './routes/products.js'
import { router as user } from './routes/user.js'
import { router as order } from './routes/order.js'
import { notFound, errorHandle } from './middlewares/error.js'

const app = express()

//use
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

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
