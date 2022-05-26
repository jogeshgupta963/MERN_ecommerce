import express from 'express'

import {connect}  from './database/db.js'
import cors  from 'cors' 
// require('dotenv').config();
import 'dotenv/config'
const app = express();
import {router as products}  from './routes/products.js'

import {notFound,errorHandle} from './middlewares/error.js'
//use
app.use(express.json())
app.use(cors()); 

//routes
app.use('/products',products)

app.use(notFound)
app.use(errorHandle)
;
(async function (){
    try {
        
        await connect(process.env.MONGO_URI)
        console.log('DB connected');
        app.listen(process.env.PORT ||3001 , ()=> console.log("Server started"))
        
    } catch (err) {
        console.log(err.message);
    }

})();
