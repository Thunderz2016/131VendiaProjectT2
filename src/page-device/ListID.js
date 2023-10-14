import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text } from "@chakra-ui/react";
import {
  Table, Thead,
  Tbody,Tr, Th, Button,
  Td
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";

const { client } = vendiaClient();

export const ListID = () => {

 // const [deviceId, setdeviceId] = useState("");
  const [deviceId, setDeviceId] = useState(""); // State for Device ID
  // Change state variable name to "devices" for storing the list of devices
  const [devices, setDevices] = useState("");
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

  const ListID = async () => {

    // Sending a request to update the device information with the new values
    const ListIDResponse = await client.entities.test.update({
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
    
    console.log(ListIDResponse); // Logging the response (you may want to handle this differently)
    // navigate("/device"); // Redirecting to the device list page after updating (commented out)
  };

  useEffect(() => {
    // List all the Test
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);
  
  useEffect(() => {
    if (deviceId) {

    // Fetch the device information based on the deviceId
    const fetchDevice = async () => {
      const deviceResponse = await client.entities.test.get(deviceId);

      // Setting the retrieved data into respective state variables
      setDevice(deviceResponse.Device);
      setTestID(deviceResponse.TestID.toString());
      setOrgAssignment(deviceResponse.OrgAssignment);
      setTestName(deviceResponse.TestName);
      setTestMethod(deviceResponse.TestMethod);
      setNotes(deviceResponse.Notes);
      setCompleted(deviceResponse.Completed);
      setUpdatedBy(deviceResponse.UpdatedBy);
    };

    fetchDevice(); // Calling the fetchDevice function when 'deviceId' changes
  }
  }, [deviceId]); 

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Preventing the default form submission behavior
    updateDevice(); // Calling the updateDevice function to update the device
  };

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
                        <Td>{test._id}</Td> {/* Display the _id field only */}
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