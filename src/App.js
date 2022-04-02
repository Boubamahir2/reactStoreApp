import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Authwrapper,
  Error,
  Carte,
  Checkout,
  SingleProduct,
  PrivateRoute,
  Products,
} from "./pages";
//authwarpper gives our app enough time to check for the function before being redirected to the home page
function App() {
  return (
    <Authwrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </Authwrapper>
  );
}

export default App;
