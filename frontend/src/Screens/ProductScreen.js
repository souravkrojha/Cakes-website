import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import Rating from '../Components/Rating';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Meta from '../Components/Meta';

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  let qty = 1;
  const [modalShow, setModalShow] = useState(false);
  const [weight, setWeight] = useState(0.5);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${
        match.params.id
      }?qty=${qty.toString()}&weight=${weight.toString()}`
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" centered>
        <Modal.Body>
          <Col md={6}>
            <img
              style={{ height: '100%', width: '100%' }}
              src={product.image}
              alt={product.name}
            />
          </Col>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <Meta title={`Buy ${product.name}`} />
      <Link to="/">
        <Button type="button" variant="outline-primary" className="mb-3">
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ModalImage
                small={product.image}
                large={product.image}
                alt={product.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3> {product.name} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: &#8377;
                  {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>&#8377;{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control as="select" value={qty} readOnly>
                          <option>1</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Weight:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={weight}
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                        >
                          {[
                            0.5,
                            1.0,
                            1.5,
                            2.0,
                            2.5,
                            3,
                            3.5,
                            4,
                            4.5,
                            5,
                            5.5,
                            6,
                          ].map((x) => (
                            <option key={x} value={x}>
                              {x} pound
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button variant="primary" block onClick={addToCartHandler}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substr(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          type="rating"
                          as="select"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login</Link> to Write Review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        dialogClassName="modal-40w"
        onHide={() => setModalShow(false)}
      />
    </React.Fragment>
  );
};

export default ProductScreen;
