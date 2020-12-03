import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Meta from '../Components/Meta';
import FormContainer from '../Components/FormContainer';
import { getUserDetails, updateUserAdmin } from '../actions/userActions';
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants';
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateAdmin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAdmin({ _id: userId, name, email, isAdmin }));
  };
  return (
    <React.Fragment>
      <Meta title={'Edit User - Dipti Emanuel Cakes'} />
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate ? <Loader /> : error && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                Name<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email<span style={{ color: 'red' }}>*</span>{' '}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
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

export default UserEditScreen;
