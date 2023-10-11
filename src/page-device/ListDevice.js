import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Table, Thead,
  Tbody,Tr, Th,
  Td
} from '@chakra-ui/react'

const { client } = vendiaClient();

export const List = () => {

  const [deviceId, setdeviceId] = useState([]); // Change state variable name to "devices" for storing the list of devices
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [testList, setTestList] = useState([]);

  //const navigate = useNavigate();

  useEffect(() => {
    // List all the Test
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);

  const listDevice = async () => {
    // Add a new prod uct
    const listDeviceResponse = await client.entities.test.list({
      _id: deviceId,
      Device: device,
      TestID: parseInt(testID),
      OrgAssignment: orgAssignment,
      TestName: testName,
      TestMethod: testMethod,
      Notes: notes,
      Completed: Boolean(completed),
      UpdatedBy: updatedBy,
    });
    console.log(listDeviceResponse);
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">List Device Page</Text>
  
      <Box overflowX="auto" align="center">

        <Table>

          <Thead>
            <Tr>
              <Th>Device</Th>
              <Th>TestID</Th>
              <Th>OrgAssignment</Th>
              <Th>TestName</Th>
              <Th fontWeight='extrabold'>TestMethod</Th>
              <Th>Notes</Th>
              <Th>Completed</Th>
              <Th>UpdatedBy</Th>
            </Tr>
          </Thead>

          <Tbody>
            {testList.map((test, index) => (
              <Tr key={index}>
                <Td>{test.Device}</Td>
                <Td>{test.TestID}</Td>
                <Td>{test.OrgAssignment}</Td>
                <Td>{test.TestName}</Td>
                <Td>{test.TestMethod}</Td>
                <Td>{test.Notes}</Td>
                <Td>{test.Completed.toString()}</Td>
                <Td>{test.UpdatedBy}</Td>
              </Tr>
            ))}
          </Tbody>

        </Table>

      </Box>
    </Stack>
  );
  
};

export default List;