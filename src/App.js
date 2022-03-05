import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Authwrapper,
  Error,
  Carte,
  Checkout,
  SinglePage,
  PrivateRoute,
  Products,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/Carte">
          <Carte />
        </Route>
        <Route exact path="/Products">
          <Products />
        </Route>
        <Route exact path="/Products/:id" children={<SinglePage />} />

        <Route exact path="/Checkout">
          <Checkout />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
