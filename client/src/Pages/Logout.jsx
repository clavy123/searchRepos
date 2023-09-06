import { Button, VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

const Logout = () => {
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/signput`);
      if (response.statusText === "OK") {
        toast.success("Logged out successfully",{
          duration:3000,
        })
        navigate("/login");
      }
    } catch (err) {
      return toast.error(err.message,{
        duration:3000,
      })
    }
  }
  return (
    <VStack>
      <Heading>You are Logged out...</Heading>
      <Text>Please click below link to Login again</Text>
      <Button onClick={handleLogOut}>Login</Button>
    </VStack>
  );
};

export default Logout;
