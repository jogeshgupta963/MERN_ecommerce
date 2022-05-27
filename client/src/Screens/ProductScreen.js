import React,{useState,useEffect} from "react";
import { Link,useParams,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../redux/cart'
import {fetchSingleProduct} from '../redux/singleProduct'
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen()
 {
    const [qty, setQty] = useState(1);


    const {id} = useParams();
    
    const {product,status,error} = useSelector(state=>state.product);
    const {cart} = useSelector(state=>state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const handleClick = () =>{ 
      const payload = {
        ...product,
        qty
      }
        dispatch(addToCart(payload))
      // navigate(`/cart/${id}?qty=${qty}`);
      navigate(`/cart`);
    }
  
  
  useEffect(()=>{
    
    dispatch(fetchSingleProduct(id))
  },[dispatch,id]);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
        {status ==='error' && <Message variant="danger" msg={error}>{error}</Message>}
        {status ==='loading' && <Loader /> }
        {status ==='success' && 
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} style={{ marginLeft: "3rem" }}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

             {product.countInStock >0 &&  <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control as='select' value={qty}
                    onChange={(e)=>setQty(e.target.value)}>
                     {
                       [...Array(product.countInStock).keys()].map(
                           x =>
                            <option key={x+1} value={x+1} >{x+1} </option> )

                     } 
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>}

              <ListGroup.Item>
                <Button
                onClick = {handleClick }
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>}
    </div>
  );
}

export default ProductScreen;
