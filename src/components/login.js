import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
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
  Stack,
} from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in user:', userCredential.user);
        console.log(userCredential);
        navigate("/DeviceOne");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log('Logged in user:', userCredential.user);
        navigate("/DeviceOne");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log('Logged in user:', userCredential.user);
        navigate("/DeviceOne");
      })
      .catch((error) => {
        console.error(error);
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
      boxShadow="md"
    >
      <Heading as="h2" size="lg" textAlign="center">
        Login
      </Heading>

      <form onSubmit={loginWithEmailAndPassword}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Center>
          <Button colorScheme="blue" type="submit">
            Log In
          </Button>
        </Center>
      </form>

      <Center>
        <Button
          colorScheme="red"
          onClick={loginWithGoogle}
        >
          Log In with Google
        </Button>
      </Center>

      <Center>
        <Button
          colorScheme="facebook"
          onClick={loginWithFacebook}
        >
          Log In with Facebook
        </Button>
      </Center>

      <Center>
        <Box>
          <p>
            Don't have an account?{" "}
            <Link color="red" href="#" as={RouterLink} to="/register">
              Register
            </Link>
          </p>
        </Box>
      </Center>
    </Stack>
  );
}

export default Login;
