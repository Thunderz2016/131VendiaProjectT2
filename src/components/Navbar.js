import {
  Box, Button,
   Text, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { 
  EditIcon, DeleteIcon, AddIcon, ViewIcon, HamburgerIcon  } from "@chakra-ui/icons";
import { auth } from "../firebase";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef() // from Chakra UI
  const sizes = ['xs'] // size of the Drawer
  const [size, setSize] = React.useState('') // from Chakra UI
  


const userSignOut = () => { {/* Signout fronm firebase*/}
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        //navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const location = useLocation();


  if (location.pathname === "/" || location.pathname === "/register") {
    return null; // Don't render the Navbar for login and register routes
  }
  
  return (
    <Box bg="orange" py={3} px={3} boxShadow="md" position="sticky" top="0">

      <> {/* The Physical Button that opens the drawer */}
        {sizes.map((size) => (
          
          <Button 
            ref={btnRef}
            colorScheme='teal'
            onClick={() => handleClick(size)}
            key={size}
            m={4}
          >
            {`Menu`}
          </Button>
        ))}

        {/* The direction the drawer opens*/}

        <Drawer
          isOpen={isOpen}
          placement='left' // can be changed
          onClose={onClose}
          finalFocusRef={btnRef}
          size={size}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton /> {/*Top right close button*/}

            <DrawerBody> {/* This stores everything in the drawer*/}

              <VStack spacing="4"> {/* This control the list spacing of the other pages*/}

              <Link to="/Demo">
                <Box p={2} display="flex" alignItems="center">
                  <HamburgerIcon mr={2} />
                  Homepage
                </Box>
              </Link>

              <Link to="/Device">
                <Box p={2} display="flex" alignItems="center">
                  <AddIcon mr={2} />
                  Device Add
                </Box>
              </Link>

              <Link to="/DeviceUpdate">
                <Box p={2} display="flex" alignItems="center">
                  <EditIcon mr={2} />
                  Device Update
                </Box>
              </Link>

              <Link to="/DeleteDevice">
                <Box p={2} display="flex" alignItems="center">
                  <DeleteIcon mr={2} />
                  Delete
                </Box>
              </Link>

              <Link to="/ListDevice">
                <Box p={2} display="flex" alignItems="center">
                  <ViewIcon mr={2} />
                  List Page
                </Box>
              </Link>

              <Link to="/ListID">
                <Box p={2} display="flex" alignItems="center">
                  <ViewIcon mr={2} />
                  List ID
                </Box>
              </Link>
              </VStack>
            </DrawerBody> {/* This ENDS stores everything in the drawer*/}

            <DrawerFooter> {/* This stores everything in the Bottom drawer*/}
              <HStack spacing='30px'> {/*Spacing between the two buttons*/}
                <Link to="/">
                  <Button colorScheme="blue" type="submit">
                    Log In
                  </Button>
                </Link>


                {authUser ? (
                  <>
                    <Button marginLeft="auto" colorScheme="red" onClick={userSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Text textAlign="center">Signed Out</Text>
                )}
              </HStack>
            </DrawerFooter> {/* This ENDs stores everything in the Bottom drawer*/}
          </DrawerContent> {/* This ENDs ALL contents in the drawer*/}
        </Drawer>
      </>
    </Box>
  );
};

export default Navbar;