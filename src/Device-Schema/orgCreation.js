import { vendiaClient } from "../vendiaClient";
import { Input, Button, HStack } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { Stack, Box, Text, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";

const { client } = vendiaClient();

export const OrgCreation = () => {

    const toast = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [authUser, setAuthUser] = useState(null);
    const [orgLists, setOrgList] = useState([]);


    useEffect(() => {

      const orgList = async () => {
  
        const listOrgResponse = await client.entities.orgs.list({readMode: 'NODE_LEDGERED'});
        console.log(listOrgResponse?.items);
        setOrgList(listOrgResponse?.items);
      };
  
      orgList();
    }, []);
   
    useEffect(() => {
        onAuthStateChanged(auth, setAuthUser);  // Directly set the user when authentication state changes
    }, []);

    const addOrg = async () => {
      try {
          // Add a new product
            const addOrgResponse = await client.entities.orgs.add({
              Name: name,
              Email: email,
            });
            console.log(addOrgResponse);
            // Show success toast
            toast({
              title: "Organization Added",
              description: "The organization has been successfully added.",
              status: "success",
              duration: 5000,
              isClosable: true,
          });
        } catch (error) {
          // Show error toast
              toast({
                  title: "Error",
                  description: "There was an error adding the organization.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
              });
    } 
    
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

        <Box overflowX="auto" align="center">

        <Table>

          <Thead>

            <Tr>
          {/* <Th>DeviceID</Th> */}
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>

          <Tbody>
            {orgLists.map((org, index) => (
              <Tr key={index}>
            {/* <Td>{org._id}</Td> */}
                <Td>{org.Name}</Td>
                <Td>{org.Email}</Td>
              </Tr>
            ))}
          </Tbody>

        </Table>
        
      </Box>

      </form>
    </Stack>
  );
};

export default OrgCreation;