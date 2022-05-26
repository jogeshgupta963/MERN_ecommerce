import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import {useSelector,useDispatch} from 'react-redux'
import {fetchProducts} from '../redux/productList'
import '../loader.css'

function HomeScreen() {
  
  // const [products, setProducts] = useState([])

  const {products,status} = useSelector(state=>state.products);
  const dispatch = useDispatch();

  function loader(){
    return (
      <>
      <div class="cssload-loader">
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
          <div class="cssload-side"></div>
        </div>
      </>
    )
  }

  useEffect(()=>{ 
    dispatch(fetchProducts())
  },[dispatch])

  return (
    <div>
      <h1 className="py-3">Latest Products</h1>
      <Row>
        {status ==='loading' && loader()}
        {status ==='success' && products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
