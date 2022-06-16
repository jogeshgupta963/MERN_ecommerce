import logo from './logo.svg'

import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ResetPassword from './Screens/ResetPassword'
import ForgotPassword from './Screens/ForgotPassword'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from './Screens/UserListScreen'
import EditUserScreen from './Screens/EditUserScreen'
import ProductListAdminScreen from './Screens/ProductListAdminScreen'
import EditProductScreen from './Screens/EditProductScreen'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Container>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route
                path="/user/resetPassword/:id"
                element={<ResetPassword />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/place-order" element={<PlaceOrderScreen />} />
              <Route path="/userOrder/:id" element={<OrderScreen />} />
              <Route path="/userOrder/:id" element={<OrderScreen />} />
              <Route path="/admin/all-users/" element={<UserListScreen />} />
              <Route
                path="/admin/all-products/"
                element={<ProductListAdminScreen />}
              />
              <Route
                path="/admin/all-products/page/:pageNumber"
                element={<ProductListAdminScreen />}
              />
              <Route path="/admin/user/edit/:id" element={<EditUserScreen />} />
              <Route
                path="/admin/product/edit/:id"
                element={<EditProductScreen />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
