import Product from "../models/Product.js";


//@route /products
//@desc GET get all products
//@access Public
async function getAllProducts(req,res){
    try {
        const product = await Product.find();
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json(error.message);
    }
}
//@route /products/:id
//@desc GET get single product
//@access Public

async function getSingleProduct(req,res){
    try {
            const product = await Product.findById(req.params.id);
            // throw new Error("Item doesnt Exist")
            if(!product) return res.status(400).json("Product not found")
            res.status(200).json(product);
        
    } catch (err) {
        res.status(404).json(err.message);
    }
}

export {
    getAllProducts,
    getSingleProduct
}