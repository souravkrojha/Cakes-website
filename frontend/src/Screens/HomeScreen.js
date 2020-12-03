import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../Components/Product';
import Category from '../Components/Category';
import Video from '../Components/Video';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import Meta from '../Components/Meta';
import Loader from '../Components/Loader';
import category from '../categoriesData';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <React.Fragment>
      <Meta />
      {!keyword && <Video />}
      {!keyword && <h1>Categories</h1>}
      <Row className="my-3">
        {!keyword &&
          category.map((item) => (
            <Col key={item.id} xs={6} sm={6} md={6} lg={4} xl={3}>
              <Category categoryItem={item} />
            </Col>
          ))}
      </Row>
      {!keyword ? (
        <h1 className="mt-3 latest-products"> Trending Cakes</h1>
      ) : (
        <h1 className="mt-3 latest-products">
          Search results for {keyword}.......
        </h1>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
