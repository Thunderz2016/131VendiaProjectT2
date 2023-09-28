// Import necessary dependencies from React and Firebase and chakra
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
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

function Register() {
  // Initialize state variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // navigate from register to login
  const navigate = useNavigate();
  // hide and show password
  const handleClick = () => setShow(!show)
  const [show, setShow] = React.useState(false)

  // handle the registration process
  const register = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use Firebase's createUserWithEmailAndPassword function to create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // If registration is successful, log the user credential
        console.log(userCredential);
        navigate('/login'); // redirect to login on click
      })
       // If there's an error during registration, log the error
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack
      spacing={4}
      maxW="400px"
      mx="auto"
      mt="50px"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg">
      
      <Heading as="h2" size="lg">
        Register
      </Heading>

      <form onSubmit={register}>
{/* input field for registration */}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
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

          <Button colorScheme="red" type="submit">
            Register
          </Button>

      </form>

{/* link button to login */}
      <Box>
        <p>
        Already Have an Account?{" "}
        <Link as={RouterLink} to="/login">
          Login
        </Link>
        </p>
      </Box>

    </Stack>

  );
}

// Export the Register component for use in other parts of the application
export default Register;