import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

//the rest is gathering everything that we are passing in the private route as path
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  console.log(user);
  //remember that private is hiden by default from the UI but it can still be acces through typing it on the search bar,
  //to avoid that we have add some restrictions
  //we want the user to access the private route only if he's logged in
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
