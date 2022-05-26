
import mongoose from "mongoose";
import 'dotenv/config'

import users from './data/user.js'
import products from './data/product.js'

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import {connect}  from './database/db.js'

const connection =async()=>await  connect(process.env.MONGO_URI)
connection();
async function importData(){
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers =await User.insertMany(users)
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(prod=>{
            return {
                ...prod,
                user:adminUser
            }
        })
        await Product.insertMany(sampleProducts);
        console.log("data imported")
        // process.exit(0);
    } catch (error) {
        console.log(error.message);
        // process.exit(1);
    }
}
async function destroyData(){
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        
        console.log("data destroyed")
        process.exit(0);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

process.argv[2] === '-d'? destroyData() :importData()

