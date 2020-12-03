import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Meta from '../Components/Meta';
import FormContainer from '../Components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setImage(product.image);
        setPreviewImageUrl(product.previewImageUrl);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          contentType: 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error.message);
      setUploading(false);
    }
  };

  const uploadPreviewFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          contentType: 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setPreviewImageUrl(data);
      setUploading(false);
    } catch (error) {
      console.log(error.message);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        description,
        category,
        price,
        image,
        previewImageUrl,
      })
    );
  };
  return (
    <React.Fragment>
      <Meta title={'Edit Product - Dipti Emanuel Cakes'} />
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                Edit Product
                <span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>
                Description<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>
                Category<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="category"
                placeholder="Enter Product Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>
                Price<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>
                Image<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={product.image}
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              >
                {uploading && <Loader />}
              </Form.File>
            </Form.Group>

            <Form.Group controlId="previewImage">
              <Form.Label>
                Preview Image<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={product.previewImageUrl}
                value={previewImageUrl}
                onChange={(e) => {
                  setPreviewImageUrl(e.target.value);
                }}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadPreviewFileHandler}
              >
                {uploading && <Loader />}
              </Form.File>
            </Form.Group>

            <Button type="submit" variant="outline-primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditScreen;
