import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import Meta from '../Components/Meta';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/placeorder');
  };
  return (
    <React.Fragment>
      <Meta title={'Shipping - Dipti Emanuel Cakes'} />
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Save Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>
              Address<span style={{ color: 'red' }}>*</span>{' '}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              City<span style={{ color: 'red' }}>*</span>{' '}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your City"
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>
              Postal Code<span style={{ color: 'red' }}>*</span>{' '}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              required
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Country">
            <Form.Label>
              Country<span style={{ color: 'red' }}>*</span>{' '}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="outline-primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </React.Fragment>
  );
};

export default ShippingScreen;
