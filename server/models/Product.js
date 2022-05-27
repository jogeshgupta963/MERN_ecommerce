import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:[true,"name is required"]
    },
    rating:{
        type:Number,
        // required:[true,"rating is required"],
    },
    comment:{
        type:String,
        // required:[true,"comment is required"]
    }
})
reviewSchema.set('timestamps',true)

const productSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        // required:[true,"name is required"]
    },
    image:{
        type:String,
        // required:[true,"email is required"],
        
    },
    brand:{
        type:String,
        // required:[true,"brand is required"]
    },
    category:{
        type:String,
        // required:[true,"category is required"]
    },
    description:{
        type:String,
        // required:[true,"desc is required"]
    },
    reviews:[
        reviewSchema
    ],
    rating:{
        type:Number,
        // required:[true,"rating is required"],
        default:0
    },
    numReviews:{
        type:Number,
        // required:[true,"no of reviews is required"],
        default:0
    },
    price:{
        type:Number,
        // required:[true,"price is required"],
        default:0
    },
    countInStock:{
        type:Number,
        // required:[true,"stock count is required"],
        default:0
    },
})
productSchema.set('timestamps',true)


const Product = mongoose.model('Product',productSchema);

export default Product