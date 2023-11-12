import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // make sure the path to your firebase config is correct
import { Flex, Text } from "@chakra-ui/react";

const Profile = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setAuthUser(user); // Set the user object when the authentication state changes
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
      
    return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      {authUser ? (
        <Text fontSize="xl">{`Signed In as ${authUser.email}`}</Text>
      ) : (
        <Text fontSize="xl">Not signed in</Text>
      )}
    </Flex>
   
  );
};

export default Profile;
