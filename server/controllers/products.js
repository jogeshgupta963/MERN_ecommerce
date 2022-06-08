import Product from '../models/Product.js'

//@route /products
//@desc GET get all products
//@access Public
async function getAllProducts(req, res) {
  try {
    const product = await Product.find()
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json(error.message)
  }
}
//@route /products/:id
//@desc GET get single product
//@access Public

async function getSingleProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)
    // throw new Error("Item doesnt Exist")
    if (!product) return res.status(400).json('Product not found')
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json(err.message)
  }
}
//@route /products/:id
//@desc delete del product
//@access private/admin
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(400).json('Product not found')
    res.status(200).json('product Deleted')
  } catch (err) {
    res.json(err.message)
  }
}

async function createProduct(req, res) {
  try {
    const product = new Product({
      name: 'SampleName',
      price: 0,
      user: req.user.id,
      image: `/images/sample.png`,
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'prod description',
    })
    const prod = await product.save()
    res.json(prod)
  } catch (error) {
    res.json(error.message)
  }
}
async function editProduct(req, res) {
  try {
    const {
      name,
      price,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    } = req.body
    console.log(req.file)
    const product = await Product.findById(req.params.id)
    if (!product) throw new Error('Product not found')
    product.name = name
    product.price = price
    product.image = req.file.path
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.numReviews = numReviews
    product.description = description
    await product.save()
    res.json(product)
  } catch (err) {
    res.json(err.message)
  }
}

export {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  editProduct,
}
