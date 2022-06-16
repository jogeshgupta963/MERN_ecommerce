import Product from '../models/Product.js'

//@route /products
//@desc GET get all products
//@access Public
async function getAllProducts(req, res) {
  try {
    const pageSize = 10

    const page = Number(req.query.pageNumber) || 1

    const { keyword } = req.query
    const products = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : {}
    const count = await Product.countDocuments({ ...products })
    const product = await Product.find({ ...products })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.status(200).json({ product, page, pages: Math.ceil(count / pageSize) })
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

//@route /products/
//@desc POST create product
//@access private/admin
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
//@route /products/:id
//@desc PUT update product
//@access private/admin
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
    const product = await Product.findById(req.params.id)
    if (!product) throw new Error('Product not found')
    product.name = name
    product.price = price
    product.image = req.file.path.replaceAll('\\', '/').split('public')[1]
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
//@route /products/reviews/:id
//@desc POST create review
//@access private
async function createReview(req, res) {
  try {
    const { id } = req.params
    const { rating, comment } = req.body

    const product = await Product.findById(id)
    if (!product) throw new Error('Product not found')

    if (
      product.reviews.find((r) => r.user.toString() === req.user._id.toString())
    )
      throw new Error('Already Reviewed')

    product.reviews.push({
      user: req.user._id,
      rating: Number(rating),
      comment,
      name: req.user.name,
    })

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.json(product)
  } catch (err) {
    res.json(err.message)
  }
}
//@route /products/top
//@desc GET get top rated products
//@access Public
async function getTopRatedProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
  } catch (error) {
    res.json(error.message)
  }
}

export {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  editProduct,
  createReview,
  getTopRatedProducts,
}
