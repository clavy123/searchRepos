import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  VStack,
  FormLabel,
  FormControl,
  Input,
  Box,
  Heading,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const formData = {
    email,
    password,
  };

  async function handleSubmit() {
    try {
      if (!(email || password)) {
        console.log("Hello world");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/signin`,
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.statusText !== "OK") {
        return toast.error("Invalid details",{
          duration:3000,
        });
      }
      toast.success("login Successfully",{
        duration:3000,
      });
      navigate("/");
    } catch (e) {
      return toast.error(e.message,{
        duration:3000,
      })
    }
  }

  return (
    <VStack
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        maxWidth="430px"
        width="100%"
        padding="30px"
        borderRadius="6px"
        boxShadow="lg"
        bg="white"
      >
        <Heading textAlign="center" mb={{ base: "4", md: "6" }}>
          Login
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            bg="gray.100"
            mb="4"
            focusBorderColor="teal.500"
          />
          <FormLabel>Password</FormLabel>
          <InputGroup size="md" marginBottom="4">
            <Input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setpassword(e.target.value)}
              bg="gray.100"
              focusBorderColor="teal.500"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          marginTop="10px"
          width="100%"
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </VStack>
  );
};

export default Login;
