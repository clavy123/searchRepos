import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <Box
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
      color="black"
      boxShadow="dark-lg"
      fontFamily="Roboto"
    >
      <Link to="/" className="header-link">Home</Link>
      <Link to="/register"  className="header-link">Register</Link>
      <Link to="/login"  className="header-link">Login</Link>
      <Link to="/logout" className="header-link">Logout</Link>
    </Box>
  );
};

export default Header;
