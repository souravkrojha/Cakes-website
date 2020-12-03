import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesListProducts } from '../actions/categoriesAction';
import { Row, Col } from 'react-bootstrap';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Meta from '../Components/Meta';
import Product from '../Components/Product';
const CategoriesScreen = ({ match }) => {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categoriesListProducts);
  const { loading, error, products } = categoriesList;
  useEffect(() => {
    dispatch(categoriesListProducts(match.params['category']));
  }, [dispatch, match]);
  return (
    <React.Fragment>
      <Meta
        title={`Cake Categories:${match.params['category']}`}
        description={`beautiful and delicious ${match.params['category']} cakes`}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="primary">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};

export default CategoriesScreen;
