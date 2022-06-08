import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Message from '../components/Message'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productList'
import { deleteProduct } from '../redux/productList'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function ProductListAdminScreen() {
  //hooks
  const { products, status, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.user)
  const [err, setErr] = React.useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //functions
  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(`/products/${id}`)
      console.log(response)
      if (!response) throw new Error('user not found')

      dispatch(deleteProduct(id))
      setErr({ variant: 'success', msg: 'Product Deleted' })
    } catch (error) {
      setErr({ variant: 'danger', msg: error.message })
    }
  }
  const createProductHandle = async () => {
    try {
      const response = await axios.post('/products')
      if (!response) throw new Error('user not found')
      setErr({ variant: 'success', msg: 'Product Created' })
      navigate(`/admin/product/edit/${response.data._id}`)
    } catch (error) {
      setErr({ variant: 'danger', msg: error.message })
    }
  }
  //hooks
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      {!Cookies.get('JWT') && <Navigate to="/" />}
      {user.role !== 'Admin' && <Navigate to="/" />}
      {status === 'loading' && <Loader />}
      {status === 'error' && (
        <Message
          variant={error === 'User Deleted' ? 'success' : 'danger'}
          msg={error}
        />
      )}
      {err !== null && <Message variant={err.variant} msg={err.msg} />}
      {status === 'success' && (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Products</h1>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Button className="my-3" onClick={createProductHandle}>
                <i className="fas fa-plus"> Create Product</i>
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>₹{user.price}</td>
                  <td>{user.category}</td>
                  <td>{user.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/edit/${user._id}`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-edit"></i>{' '}
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandle(user._id)
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default ProductListAdminScreen
