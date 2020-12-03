import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';

const Product = ({ product }) => {
  return (
    <React.Fragment>
      <Card className="my-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image}></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>
              <h3 className="product-name">
                <strong>{product.name}</strong>
              </h3>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">&#8377;{product.price}</Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Product;
