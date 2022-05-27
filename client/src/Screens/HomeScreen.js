import React,{useEffect} from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '../redux/productList'
import '../loader.css'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {

  const {products,status,error} = useSelector(state=>state.products);
  const dispatch = useDispatch();


 

  useEffect(()=>{ 
    dispatch(fetchProducts())
  },[dispatch])

  return (
    <div>
      <h1 className="py-3">Latest Products</h1>
      <Row>
        {status ==='error' && <Message variant="danger" msg={error}>{error}</Message>}
        {status ==='loading' && <Loader /> }
        {status ==='success' && products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
     
    </div>
  );
}

export default HomeScreen;
