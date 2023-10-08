import {
  Box,
  Button,
  Flex,
  VStack,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { HamburgerIcon, EditIcon, 
  DeleteIcon, AddIcon, StarIcon  } from "@chakra-ui/icons";
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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box bg="blue.500" py={3} px={4} boxShadow="base" position="sticky" top="0">
    <Menu>
      <MenuButton
      as={IconButton}
      aria-label='Options'
     icon={<HamburgerIcon />}
      variant='outline'
    />
    <MenuList>

        <Link to="/DynamicList">
          <MenuItem icon={<StarIcon />} >
            Home Page
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
        
      </MenuList>

      
        <Flex justifyContent="flex-end" align="center">
          <VStack align="flex-end" spacing={2}>
            <Input type="text" placeholder="Search" />
          </VStack>
        </Flex>
        
        

      
    </Menu>
    </Box>
  );
};

export default Navbar;