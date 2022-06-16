import React, { useEffect, useRef } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import Cookies from 'js-cookie'
import Loader from '../components/Loader'

function EditProductScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { products, status, error } = useSelector((state) => state.products)
  const [singleProduct, setSingleProduct] = React.useState({})
  const [uploading, setUploading] = React.useState(false)

  const name = useRef(singleProduct.name)
  const price = useRef(singleProduct.Price)
  const description = useRef(singleProduct.description)
  const brand = useRef(singleProduct.brand)
  const category = useRef(singleProduct.category)
  const countInStock = useRef(singleProduct.countInStock)
  const [image, setImage] = React.useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    // const formData = new FormData()
    // formData.append('image', file)
    // setUploading(true)
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    //   const { data } = await axios.put('/products', formData, config)
    setImage(file)
    // console.log(file)
    // } catch (error) {
    //   console.log(error.message)
    //   setUploading(false)
    // }
  }

  const submitHandle = async (e) => {
    e.preventDefault()

    try {
      console.log(image)

      const formData = new FormData()
      formData.append('image', image)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.put(
        `/products/${singleProduct._id}`,
        {
          name: name.current.value,
          price: price.current.value,
          description: description.current.value,
          brand: brand.current.value,
          category: category.current.value,
          countInStock: countInStock.current.value,
          image: image,
        },
        config,
      )

      if (data) navigate('/admin/all-products/')
      else throw new Error('Something went wrong')
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const prodDetails = async () => {
      const { data } = await axios.get(`/products/${id}`)
      setSingleProduct(data)
    }
    prodDetails()
  }, [products, id])

  return (
    <div>
      {!Cookies.get('JWT') && user.role !== 'Admin' && <Navigate to="/" />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-2 text-center">Edit Product</h1>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId="name">
                <Form.Label className="mt-2">Name</Form.Label>

                <Form.Control
                  type="text"
                  defaultValue={singleProduct.name}
                  placeholder="Enter Name"
                  ref={name}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label className="mt-2">Price</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter Price"
                  ref={price}
                  defaultValue={singleProduct.price}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label className="mt-2">Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={description}
                  defaultValue={singleProduct.description}
                  placeholder="Enter Description"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label className="mt-2">Brand</Form.Label>
                <Form.Control
                  type="text"
                  ref={brand}
                  defaultValue={singleProduct.brand}
                  placeholder="Enter brandname"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label className="mt-2">Category</Form.Label>
                <Form.Control
                  type="text"
                  ref={category}
                  defaultValue={singleProduct.category}
                  placeholder="Enter product category"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="count-in-stock">
                <Form.Label className="mt-2">Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  ref={countInStock}
                  defaultValue={singleProduct.countInStock}
                  placeholder="Enter stock count"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label className="mt-2">Image</Form.Label>
                <Form.Control
                  type="file"
                  // ref={image}
                  onChange={handleFileChange}
                ></Form.Control>
                {/* <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={handleFileChange}
                ></Form.File> */}
                {uploading && <Loader />}
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditProductScreen
