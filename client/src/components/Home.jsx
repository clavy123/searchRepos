import React, { useState, useEffect } from "react";
import axios from "axios";
import { VStack, Box, Input, Button } from "@chakra-ui/react";

const Home = () => {
  const [name, setName] = useState("");
  const [repo, setRepo] = useState(null);

  async function searchRepo() {
    try {
      const response = await axios.get(`https://api.github.com/users/${name}`);
      const data = response.data;
      console.log(data);
      setRepo(data); // Assuming setRepo is a function that sets the state or updates a variable with the received data
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack height="100vh" width="100%" justifyContent="center">
      <Box
        display="flex"
        justifyContent="center"
        padding={4}
        width="100%"
        maxWidth="400px"
        margin="0 auto"
      >
        <Input
          type="text"
          placeholder="Enter the Username"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={searchRepo}>Search</Button>
      </Box>

      {repo && (
        <Box
          width="100%"
          maxWidth="400px"
          margin="0 auto"
          padding={4}
          boxShadow="lg"
          borderRadius={4}
          bg="white"
          mt={4}
        >
          <Box mb={4}>
            <p style={{ color: "gray", marginBottom: "8px" }}>Name</p>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              {repo.name}
            </h1>
          </Box>
          <Box mb={4}>
            <p style={{ color: "gray", marginBottom: "8px" }}>Followers</p>
            <h1
              style={{ fontSize: "18px", color: "green", marginBottom: "8px" }}
            >
              {repo.followers}
            </h1>
          </Box>
          <Box mb={4}>
            <p style={{ color: "gray", marginBottom: "8px" }}>Following</p>
            <h1
              style={{ fontSize: "18px", color: "blue", marginBottom: "8px" }}
            >
              {repo.following}
            </h1>
          </Box>
          <Box mb={4}>
            <p style={{ color: "gray", marginBottom: "8px" }}>Total Repos</p>
            <h1
              style={{ fontSize: "18px", color: "purple", marginBottom: "8px" }}
            >
              {repo.public_repos}
            </h1>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

export default Home;
