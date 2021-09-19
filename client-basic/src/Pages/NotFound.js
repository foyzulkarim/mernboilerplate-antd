import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
`;

export const NotFound = () => {

    return (<Title>The page you requested can not be found.</Title>)
}