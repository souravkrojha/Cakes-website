import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Meta from '../Components/Meta';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DETAILS_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, location, history }) => {
  //gateway functions

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const displayRazorPay = async () => {
    const res = await loadScript();

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const data = axios.post('/razorpay/order', {
      amount: order.totalPrice,
    });

    const { data: clientId } = await axios.get('/api/config/razorpay/id/key');

    const options = {
      key: clientId,
      amount: String(order.totalPrice * 100),
      currency: 'INR',
      name: 'Dipti Emanuel Cakes',
      description: 'Thankyou for shopping with us.',
      order_id: data.id,
      handler: async function (response) {
        try {
          const paymentId = response.razorpay_payment_id;
          const capturedResponse = await axios.post(
            `/razorpay/capture/${paymentId}`,
            { amount: order.totalPrice }
          );
          const successObj = JSON.stringify(capturedResponse);
          const parsedObject = JSON.parse(successObj);
          const dataObject = JSON.parse(parsedObject.data);
          console.log(dataObject.email);
          if (parsedObject.status === 200) {
            dispatch(
              payOrder(orderId, {
                id: dataObject.id,
                status: dataObject.status,
                created_at: dataObject.created_at,
                email: dataObject.email,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: order.user.name,
        email: order.user.email,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };
    var paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  window.onpopstate = () => {
    history.go(0);
    dispatch({ type: ORDER_DETAILS_RESET });
  };
  useEffect(() => {
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order, location]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <React.Fragment>
      <Meta title={`Order - ${order._id} - Dipti Emanuel Cakes`} />
      <h1 style={{ textTransform: 'uppercase' }}>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}.
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Status</h2>

              {order.isPaid ? (
                <Message variant="success">Paid on {order.createdAt}.</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>No Orders Found</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.weight}lbs x &#8377;{item.price} = &#8377;
                          {item.weight * item.price * 2}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>&#8377;{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>&#8377;{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>&#8377;{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>&#8377;{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {!userInfo.isAdmin && order.isPaid ? (
                <Button className="btn-block" disabled>
                  Your order has been placed
                </Button>
              ) : userInfo.isAdmin && order.isPaid ? (
                <Button className="btn-block" disabled>
                  This Order has been Paid
                </Button>
              ) : (
                <Button
                  className="btn-block"
                  variant="success"
                  onClick={displayRazorPay}
                >
                  Procced to payment
                </Button>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {!userInfo.isAdmin && order.isPaid ? (
                <p>
                  You can contact here +919735638553 for more information
                  regarding your order
                </p>
              ) : (
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Button className="btn-block" onClick={deliverHandler}>
                    Mark as delivered
                  </Button>
                )
              )}
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderScreen;
