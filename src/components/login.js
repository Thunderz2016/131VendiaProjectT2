// Import necessary dependencies from React and Firebase and Chakra
import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState(false);

  //intialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("The email is " + data.email);
    login(data);
  };

  const handleClick = () => setShow(!show);

  // handle the login process using Firebase
  const login = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/Demo");
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
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
      boxShadow="md"
    >
      <Heading as="h2" size="lg">
        Login
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input field for entering login email */}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <span>Email is required</span>}
        </FormControl>

        {/* Input field for entering password */}
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              {...register("password", { required: true })}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <span>Password is required</span>}
        </FormControl>

        {loginError && (
          <div>
            <span style={{ color: "red" }}>
              The username or password you entered is incorrect.
            </span>
          </div>
        )}
        <Button colorScheme="blue" type="submit">
          Log In
        </Button>
      </form>

      {/* link button for registration */}
      <Box>
        <p>
          Don't have an account?{" "}
          <Link color="yellow" href="#" as={RouterLink} to="/register">
            Register
          </Link>
        </p>
      </Box>
    </Stack>
  );
}

// Export the Login component for use in other parts of the application
export default Login;
