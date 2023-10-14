import {
  Box, Button,
  Flex, VStack,
  Input, Text,
  Menu, MenuButton,
  MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { 
  HamburgerIcon, EditIcon, 
  DeleteIcon, AddIcon, StarIcon, ViewIcon  } from "@chakra-ui/icons";
import { auth } from "../firebase";
//import { Navigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, RadioGroup, Stack, Radio
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  const handleClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const [authUser, setAuthUser] = useState(null);
  const [placement, setPlacement ] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  const sizes = ['xs'] // size of the Drawer
  const [size, setSize] = React.useState('')


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

     <> {/* Button on the Page, can also control size*/}
     {sizes.map((size) => (
      <Button ref={btnRef} 
              colorScheme='teal' 
              onClick={() => handleClick(size)}
              key={size}
              m={4}>
        {`Menu`}
      </Button>
      ))}


      <Drawer //The drawer opening
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={size}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

   <DrawerBody> {/* This is what is contained in the body of the drawer*/}

    <Menu>
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'/>

        <MenuList>

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
        
        </MenuList>
        
    </Menu>
            
           
  </DrawerBody>

          {/* Button of Page*/}

          <DrawerFooter>
            <HStack spacing='24px'>
              <Link to="/">
                <Button colorScheme="blue" type="submit">
                  Log In
                 </Button>
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
            </HStack>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

    
    </Box>
  );
};

export default Navbar;