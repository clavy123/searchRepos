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
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const formData = {
    name,
    email,
    password,
  };
  function handleSubmit() {
    try{
      if (!(name || email || password)) {
        return toast.error("Please enter above mentioned detail properly...")
      }
       const response = axios
          .post(`${import.meta.env.VITE_URL}/signup` ,formData, {
            headers: {
              "Content-type": "application/json",
            },
          })
          if(response.statusCode!=='OK'){
            return toast.error("Signup failed",{
              duration:3000,
            });
          }
          toast.success("SignUp Successfully",{
            duration:3000
          });
          navigate("/signin");
    }
    catch(err){
      return toast.info(err.message,{
        duration:3000
      });
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
          Register
        </Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            bg="gray.100"
            mb="4"
            focusBorderColor="teal.500"
            onChange={(e) => setname(e.target.value)}
          />
          <FormLabel>Email</FormLabel>
          <Input type="email"
          bg="gray.100"
          focusBorderColor="teal.500"
           onChange={(e) => setemail(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <InputGroup size="md" marginBottom="4">
            <Input
              type={showPassword ? "text" : "password"}
              bg="gray.100"
              focusBorderColor="teal.500"
              onChange={(e) => setpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button marginTop="10px"
          width="100%"
          colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </VStack>
  );
};

export default Register;
