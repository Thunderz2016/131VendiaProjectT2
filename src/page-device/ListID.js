import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const { client } = vendiaClient();

export const ListID = () => {
  
    const [orgLists, setOrgList] = useState([]);

  useEffect(() => {

    const orgList = async () => {

      const listOrgResponse = await client.entities.orgs.list({readMode: "NODE_LEDGERED"});
      console.log(listOrgResponse?.items);
      setOrgList(listOrgResponse?.items);
    };

    orgList();
  }, []);

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Orgss _id Page</Text>
      <Box overflowX="auto" align="center">

        <Table>

          <Thead>

            <Tr>
              <Th>DeviceID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>

          <Tbody>
            {orgLists.map((org, index) => (
              <Tr key={index}>
                <Td>{org._id}</Td>
                <Td>{org.Name}</Td>
                <Td>{org.Email}</Td>
              </Tr>
            ))}
          </Tbody>

        </Table>
        
      </Box>
    </Stack>
  );
};

export default ListID;