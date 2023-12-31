// Import necessary dependencies from React and Firebase and chakra
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack, Checkbox,
} from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  // Initialize state variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // navigate from register to login
  const navigate = useNavigate();
  // hide and show password
  const handleClick = () => setShow(!show)
  const [show, setShow] = React.useState(false)
  const [isAdmin, setIsAdmin] = useState(false);


  // handle the registration process
  const register = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use Firebase's createUserWithEmailAndPassword function to create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

      // Save user role to Firestore
      const userRef = doc(db, 'users', userCredential.user.email);
      return setDoc(userRef, {
        email: email,
        role: isAdmin ? 'admin' : 'user'
      });
    })
      .then(() => {
        console.log("User role saved to Firestore");
        navigate('/'); // redirect to login on click
      })
        .catch((error) => {
        console.log(error);
  });
};

  return (
    <Stack
    spacing={6}
    maxW="400px"
    mx="auto"
    mt="200px"
    p="11"
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="md">
      
      <Heading as="h2" size="lg" textAlign="center">
        Register
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Are you an admin?</FormLabel>
        <Checkbox value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
          Admin
        </Checkbox>
      </FormControl>


      <form onSubmit={register}>
{/* input field for registration */}
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        </FormControl>

{/* Input field for entering password */}
        <FormControl mb={4}>
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

          <Center>
          <Button colorScheme="red" type="submit">
            Register
          </Button>
          </Center>

      </form>

{/* link button to login */}
      <Center>
      <Box>
        <p>
        Already Have an Account?{" "}
        <Link color='blue' as={RouterLink} to="/">
          Login
        </Link>
        </p>
      </Box>
      </Center>

    </Stack>

  );
}

// Export the Register component for use in other parts of the application
export default Register;