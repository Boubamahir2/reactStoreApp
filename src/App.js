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
//authwarpper gives our app enough time to check for the function before being redirected to the home page
function App() {
  return (
    <Authwrapper>
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
          <PrivateRoute exact path="/Checkout">
            <Checkout />
          </PrivateRoute>
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Authwrapper>
  );
}

export default App;
