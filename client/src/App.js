import logo from "./logo.svg";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";

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
              <Route path="/cart">
                <Route index element={<CartScreen />} />
                <Route path=":id" element={<CartScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
