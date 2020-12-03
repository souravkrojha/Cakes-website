import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import OrderListScreen from './Screens/OrderListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let routes;
  if (userInfo) {
    routes = (
      <Switch>
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/categories/:category" component={CategoriesScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/orderslist" component={OrderListScreen} />
        <Route exact path="/admin/productlist" component={ProductListScreen} />
        <Route
          exact
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
        />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/page/:pageNumber" component={HomeScreen} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
        />
        <Route exact path="/search/:keyword" component={HomeScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/products/edit/:id" component={ProductEditScreen} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/categories/:category" component={CategoriesScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/page/:pageNumber" component={HomeScreen} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
        />
        <Route exact path="/search/:keyword" component={HomeScreen} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>{routes}</Switch>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
