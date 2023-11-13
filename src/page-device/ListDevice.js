
import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text, Select } from "@chakra-ui/react";
import {
  Table, Thead,
  Tbody,Tr, Th, Button,
  Td
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"; // Using Chakra UI components

const { client } = vendiaClient();

export const List = () => {

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchText, setSearchText] = useState("");


  //const navigate = useNavigate();

  useEffect(() => {
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      console.log(listTestResponse?.items);
      
      // If searchText is empty, display all items. Otherwise, filter based on the searchText.
      const filteredTests = searchText
        ? listTestResponse?.items.filter(test =>
            Object.values(test).some(
              val => typeof val === "string" && val.toLowerCase().includes(searchText.toLowerCase())
            )
          )
        : listTestResponse?.items;
  
      setTestList(filteredTests);
    };
  
    listTest();
  }, [searchText]);  // Added searchText as a dependency
  
  
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
  
  const updateDevice = async () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Preventing the default form submission behavior
    updateDevice(); // Calling the updateDevice function to update the device
  };
};

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">List Device Page</Text>

      <Stack>

          <Input
            placeholder="Search for a test..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
             mb={4}  // margin-bottom for some spacing
             />

      </Stack>
  
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

      {/*All This Shit is Just the pop-up Edit Button*/}
      <Stack align="center"> 
      <>
        <Button onClick={onOpen}>EDIT</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader align="center">Edit Device</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Stack spacing={4} direction="column" align="center" justify="center">

<Select
  placeholder="Select option"
  value={deviceId}
  onChange={(e) => setDeviceId(e.target.value)}
  size="md"
  width="250px"
  textAlign="center">
  {testList.map((test, index) => (
    <option key={test._id} value={test._id}>
      {test.Device} - {test.OrgAssignment}
    </option>
  ))}
</Select>

<Input
  placeholder="Device"
  value={device}
  onChange={(e) => setDevice(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="TestID[Integer]"
  value={testID}
  onChange={(e) => setTestID(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="OrgAssignment"
  value={orgAssignment}
  onChange={(e) => setOrgAssignment(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="TestName"
  value={testName}
  onChange={(e) => setTestName(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="TestMethod"
  value={testMethod}
  onChange={(e) => setTestMethod(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="Completed[Boolean]"
  value={completed}
  onChange={(e) => setCompleted(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Input
  placeholder="UpdatedBy"
  value={updatedBy}
  onChange={(e) => setUpdatedBy(e.target.value)}
  size="md"
  width="250px"
  textAlign="center"
/>

<Button colorScheme="blue" type="submit">
  Update Device
</Button>

<Button colorScheme='blue' mr={3} onClick={onClose}>
  Close
</Button>

</Stack>
               
              </ModalBody>
    
              <ModalFooter>

              </ModalFooter>
            </ModalContent>
          </Modal>
          </>

      </Stack>
    </Stack>
  );
  
};

export default List;