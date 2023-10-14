import {
  Box, Button,
  Flex, VStack,
  Input, Text,
  Menu, MenuButton,
  MenuList, MenuItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { 
  HamburgerIcon, EditIcon, 
  DeleteIcon, AddIcon, StarIcon, ViewIcon  } from "@chakra-ui/icons";
import { auth } from "../firebase";
//import { Navigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

const Navbar = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  const [authUser, setAuthUser] = useState(null);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        //navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box bg="orange" py={3} px={3} boxShadow="md" position="sticky" top="0">
    <Menu>
      <MenuButton
      as={IconButton}
      aria-label='Options'
     icon={<HamburgerIcon />}
      variant='outline'
    />
    <MenuList>

        <Link to="/Mainpage">
          <MenuItem icon={<StarIcon />} >
           Main Page
          </MenuItem>
        </Link>

        <Link to="/Device">
          <MenuItem icon={<AddIcon />} >
            Device Add
          </MenuItem>
        </Link>

        <Link to="/DeviceUpdate">
          <MenuItem icon={<EditIcon />} >
            Device Update
          </MenuItem>
        </Link>

        <Link to="/DeleteDevice">
          <MenuItem icon={<DeleteIcon />} >
             Delete
          </MenuItem>
        </Link>

        <Link to="/ListDevice">
          <MenuItem icon={<ViewIcon />} >
             List Page
          </MenuItem>
        </Link>

        <Link to="/ListID">
          <MenuItem icon={<ViewIcon />} >
             List ID
          </MenuItem>
        </Link>

        {authUser ? (
          <>
            {/*<Text textAlign="center">{`Signed In as ${authUser.email}`}</Text>*/}
            <Button  marginLeft="auto" colorScheme="red" onClick={userSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Text textAlign="center">Signed Out</Text>
        )}

        <Link to="/">
        <Button colorScheme="blue" type="submit">
          Log In
        </Button>
        </Link>
        
      </MenuList>
        
    </Menu>
    </Box>
  );
};

export default Navbar;