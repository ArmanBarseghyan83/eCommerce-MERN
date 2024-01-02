import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { changeQty, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access to the cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const changeQtyHandler = (product, qty) => {
    dispatch(changeQty({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // This will take first to the login screen, and in the loginScreen we will ckeck if the url
  // contains redirect and if the useris logged in will redirect there(in this case to /shipping),
  // else will redirect after login .
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Row className="justify-content-center">
      <Meta title="Cart" />
      <Col xl={9}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        <Button
          type="button"
          className="btn mb-3"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed To Checkout
        </Button>
        <Card className='mb-1'>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col sm={7}>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                </Col>
                <Col xs={5}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Card>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2} xs={4}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          changeQtyHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={1} className="text-center">
                      <FaTrash
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => removeFromCartHandler(item._id)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
