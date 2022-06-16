import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { fetchTopProducts } from '../redux/topProducts'

function ProductCarousel() {
  //hooks
  const dispatch = useDispatch()

  const { topProducts, status, error } = useSelector(
    (state) => state.topProducts,
  )
  console.log(topProducts)
  useEffect(() => {
    dispatch(fetchTopProducts())
  }, [dispatch])

  return (
    <>
      {error && <Message variant="danger" msg={error} />}
      {status === 'loading' && <Loader />}
      <Carousel pause="hover" className="bg-dark my-3">
        {topProducts.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                className="d-block w-100"
                fluid
              />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name}(₹{product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
