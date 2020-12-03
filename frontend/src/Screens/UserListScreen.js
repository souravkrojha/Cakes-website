import React, { useEffect } from 'react';
// import {useHistory} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Meta from '../Components/Meta';
import { getUsersList, deleteUser } from '../actions/userActions';
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user ?')) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);
  return (
    <React.Fragment>
      <Meta title={'Users List - Dipti Emanuel Cakes'} />
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" block className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  {' '}
                  <Button
                    variant="light"
                    className="btn-sm"
                    block
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash" style={{ color: 'red' }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default UserListScreen;
