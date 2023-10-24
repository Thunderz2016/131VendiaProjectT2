import { vendiaClient } from "../vendiaClient";
import { Input, Stack, Button, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";


const { client } = vendiaClient();

export const OrgCreation = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [authUser, setAuthUser] = useState(null);
   
    useEffect(() => {
        onAuthStateChanged(auth, setAuthUser);  // Directly set the user when authentication state changes
    }, []);

    const addOrg = async () => {
        // Add a new product
        const addOrgResponse = await client.entities.orgs.add({
          Name: name,
          Email: email,
        });
        console.log(addOrgResponse);
    };
   

    const handleSubmit = (event) => {
        event.preventDefault();
        addOrg();
    };

  return (
    <Stack spacing={4} align="center">
        <Text fontSize="xl">Add Orgs Page</Text>
        <form onSubmit={handleSubmit}>

        <Stack spacing={3}>
          
          <Input
            placeholder="Org name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

            <Button colorScheme="blue" onClick={handleSubmit} >
                Add Org
            </Button>

        </Stack>

        </form>
    </Stack>
  );
};

export default OrgCreation;