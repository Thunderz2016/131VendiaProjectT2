// Import necessary dependencies from React and Firebase and Chakra
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";

function Login() {
// Initialize state variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // navigate from login to demo page
  const navigate = useNavigate();
  // hide and show password
  const handleClick = () => setShow(!show)
  const [show, setShow] = React.useState(false)
  
  // handle the login process
  const login = (e) => {
    e.preventDefault();

    // Use Firebase's signInWithEmailAndPassword function to sign in a user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        // If registration is successful, log the user credential
        console.log(userCredential);
        navigate("/Demo"); // to redirect to the demo page, if the login is successful
      })
      // If there's an error during registration, log the error
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Stack
      spacing={4}
      maxW="400px"
      mx="auto"
      mt="50px"
      p="5"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md">

      <Heading as="h2" size="lg">
        Login
      </Heading>

      <form onSubmit={login}>
{/* Input field for entering login email */}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

{/* Input field for entering password */}
        <FormControl>
          <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
               <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Log In
        </Button>

      </form>

{/* link button for registration */}
      <Box>
        <p>
          Don't have an account?{" "}
          <Link color='yellow' href='#' as={RouterLink} to="/register">
            Register
          </Link>
        </p>
      </Box>

    </Stack>
    
  );
}

// Export the Login component for use in other parts of the application
export default Login;