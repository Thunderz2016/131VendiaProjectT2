import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const { client } = vendiaClient();

export const ListID = () => {
  const [deviceId, setDeviceId] = useState("");
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);

  useEffect(() => {
    if (deviceId) {
      const fetchDevice = async () => {
        const deviceResponse = await client.entities.test.get(deviceId);

        // The response is not used currently. Add states if you need them.
      };

      fetchDevice(); 
    }
  }, [deviceId]); 

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Temporary _id Page</Text>
      <Box overflowX="auto" align="center">

        <Table>

          <Thead>

            <Tr>
              <Th>DeviceID</Th>
              <Th>Device</Th>
              <Th>OrgAssignment</Th>
            </Tr>
          </Thead>

          <Tbody>
            {testList.map((test, index) => (
              <Tr key={index}>
                <Td>{test._id}</Td>
                <Td>{test.Device}</Td>
                <Td>{test.OrgAssignment}</Td>
              </Tr>
            ))}
          </Tbody>

        </Table>
        
      </Box>
    </Stack>
  );
};

export default ListID;