import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();
  //remember we protected our private route but the even if w're login and  type type checkout in the url bar we will still be redirected to the homepage
  //so in order to fix that bug we have to wrapp our app in authwrapper component
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
