import logo from "./logo.svg";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ResetPassword from "./Screens/ResetPassword";
import ForgotPassword from "./Screens/ForgotPassword";
import ShippingScreen from "./Screens/ShippingScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Container>
            <Routes>
              <Route exact path="/" element={<HomeScreen />}/>
              <Route  path="/product/:id" element={<ProductScreen/>}/>
              <Route path='/login' element={<LoginScreen/>} />
              <Route path='/register' element={<RegisterScreen/>} />
              <Route path='/profile' element={<ProfileScreen/>} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/user/resetPassword/:id' element={<ResetPassword/>} />
              <Route path='/forgot-password' element={<ForgotPassword/>} />
              <Route path='/shipping' element={<ShippingScreen/>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
