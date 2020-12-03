import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import Message from '../Components/Message';
import Meta from '../Components/Meta';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? 1 : 1;
  const weight = location.search ? Number(location.search.split('=')[2]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, weight));
    }
  }, [dispatch, match, productId, qty, weight]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      {' '}
      <Meta title={'Your Shopping Cart - Dipti Emanuel Cakes'} />
      <Row>
        <Col md={9}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="primary">
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      &#8377;{' '}
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.weight * item.price * 2,
                          0
                        )
                        .toFixed(2)}
                    </Col>
                    <Col md={2}>{item.qty}</Col>
                    <Col md={2}>{item.weight} pound</Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="far fa-times-circle"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.length}) items </h2>
              &#8377;
              {cartItems
                .reduce((acc, item) => acc + item.weight * item.price * 2, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Checkout
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
