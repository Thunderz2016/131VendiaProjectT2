import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { vendiaClient } from '../vendiaClient';
import { Box, Input, Stack, Switch, FormControl, FormLabel, Text, Select, useToast, Flex } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserRole, currentUserEmail } from "../firebase";
import { useNavigate } from 'react-router-dom';

const { client } = vendiaClient();

export const Demo = () => {

  // Notificaiton in Modal
  const toast = useToast();

  const navigate = useNavigate();

  // States for adding a new/listing device
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]);
  const [percentage, setPercentage] = useState({});
 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [testId, setTestId] = useState("");

  const [userRole, setUserRole] = useState(null); // State to store user role

  const [deviceId, setDeviceId] = useState(""); // State for Device ID

  //State for Adding To Schema
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  const [orgAssignments, setOrgAssignments] = useState([]);
  const [updatedByEmails, setUpdatedByEmails] = useState([]);

  const [testList, setTestList] = useState([]);

  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search);
  const textParam = searchParams.get("text"); // Get the 'text' parameter from the URL
  const deviceNameFromUrl = searchParams.get("deviceName");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // Fetch the user role
        getUserRole(user.email).then(role => {
          setUserRole(role); // Set the user role
        });
      } else {
        // Handle user not signed in or other scenarios
      }
    });
  }, []);

  useEffect(() => {
    // Fetch the list of devices in the device schema
    const fetchData = async () => {
      const listDeviceResponse = await client.entities.device.list({readMode: 'NODE_LEDGERED'});
      setDevices(listDeviceResponse?.items);
      console.log(listDeviceResponse?.items);

      const listTestResponse = await client.entities.test.list({readMode: 'NODE_LEDGERED'});
      const deviceCompletionPercentages = {};
      console.log(listTestResponse?.items);

      // Get the list of unique devices names e.g. ["Device 1", "Device 4"]
      const uniqueDevices = [...new Set(listTestResponse?.items.map(test => test.Device))];

      // For each device, calculate the percentage of tests completed
      uniqueDevices.forEach(async deviceName => {
        // Get the tests for the current device
        const testsForDevice = listTestResponse?.items.filter(test => test.Device === deviceName);
        // Get the total number of tests for the current device
        const totalTests = testsForDevice.length;
        const completedTests = testsForDevice.filter(test => test.Completed).length;

        // Calculate the percentage of tests completed
        const completionPercentage = Math.round((completedTests / totalTests) * 100);
        // Add the percentage to the deviceCompletionPercentages object
        deviceCompletionPercentages[deviceName] = completionPercentage;
        console.log(`${deviceName} has ${completionPercentage}% tests completed`);

        // Update the Percentage field in the device schema
        const deviceToUpdate = listDeviceResponse?.items.find(device => device.Name === deviceName);
        if (deviceToUpdate) {
            await client.entities.device.update({
                _id: deviceToUpdate._id,
                Percentage: completionPercentage
            });
        }
    });

      setPercentage(deviceCompletionPercentages);
      console.log(deviceCompletionPercentages);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Replace this with actual API call to fetch org assignments
    const fetchOrgAssignments = async () => {
      const response = await client.entities.orgs.list({readMode: 'NODE_LEDGERED'});
      console.log(response.items); 
      setOrgAssignments(response.items);
    };
  
    fetchOrgAssignments();
  }, []);

  useEffect(() => {
    const listTests = async () => {
      try {
        const listTestsResponse = await client.entities.test.list({readMode: 'NODE_LEDGERED'});
        setTestList(listTestsResponse?.items);
  
        // Log the response to check if data is being fetched
        console.log("List of tests:", listTestsResponse?.items);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
  
    listTests();
  }, []);
  
  // Function to update UpdatedBy based on OrgAssignment
  const handleOrgAssignmentChange = (selectedOrg) => {
    setOrgAssignment(selectedOrg);
    // Logic to filter and set updated by emails based on selected org
    const selectedOrgData = orgAssignments.find(org => org.Name === selectedOrg);

    if (selectedOrgData && selectedOrgData.Emails) {
      setUpdatedByEmails(selectedOrgData.Emails);
    } else {
      setUpdatedByEmails([]);
    }
  };

  // Add a new device
  const addDevice = async () => {
    const addDeviceResponse = await client.entities.device.add({
      Name: name,
      Status: status,
      //Percentage: percentage,
    });
    console.log(addDeviceResponse);
    setDevices([...devices, { Name: name, Status: status }]); // Add the new device to the local list
    setName('');  // Reset the input field
  };

  // Function to add a test to the database
  const addTest = async () => {
    try {
      const response = await client.entities.test.add({
        // Assuming 'device' is the selected device name
        Device: device,
        TestID: parseInt(testID),
        OrgAssignment: orgAssignment,
        TestName: testName,
        TestMethod: testMethod,
        Notes: notes,
        Completed: Boolean(completed),
        UpdatedBy: updatedBy,
      });
      return response;
    } catch (error) {
      throw new Error("Failed to add test");
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      // Delete the device based on the deviceId
      await client.entities.device.remove(deviceId);
      // Redirect to the device list page or any other desired page
      // navigate("/device");
      console.log("Success deleted Device")
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };
  
  // Handles name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // Handles status change
  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  }

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    addDevice();
  }

  // Handles link click
  const handleLinkClick = (deviceName) => {
  // Navigate to AgGridTable page with the deviceName as a query parameter
  navigate(`/agGridTable?deviceName=${deviceName}`);
  };

  // Handle the submission of the test form
  const handleTestSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTest();
      toast({
        title: "Test added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: "Error adding test.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderAddTestButton = () => {
    // Only show the button if the user is an admin
    if (userRole === 'admin') {
      return (
        <Button size='xs' mt={4} onClick={onOpen}>Add Test</Button>
      );
    }
    return null;
  };

  const renderDeleteButton = (deviceId) => {
    if (userRole === 'admin') {
      return (
      <Button
        colorScheme="red"
        size="xs"
        onClick={() => deleteDevice(deviceId)} // Call the deleteDevice function here
      >
        Delete
      </Button>
    );
  };
    return null;
  };

  const renderDeviceBox = (device, index) => {
    return (
      <Stack align="center" spacing={5}>
      <Box
        key={index}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        width="200px"
        textAlign="center"
        m={3}
        shadow="lg" // Adds large shadow
        borderColor="gray.400"
        _hover={{ transform: 'scale(1.20)', shadow: 'lg' }} // Scales up and increases shadow on hover for a 3D effect
        >

        <Text fontSize="xl">{device.Name}</Text>
        <Text>Test Progress: {percentage[device.Name] || 0}%</Text>

        <Progress value={percentage[device.Name]}/> 
      
        <ButtonGroup variant='solid' spacing='2' colorScheme='teal'>

        <Button size='xs' mt={4} onClick={() => handleLinkClick(device.Name)}>View tests</Button>
        
        {renderAddTestButton()}

        {renderDeleteButton(device._id)}

        </ButtonGroup>
        
      </Box>
      <Stack align="center">
      <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader align="center">Add Test For Device</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleTestSubmit}>
            <ModalBody>
              <Stack spacing={4} direction="column" align="center" justify="center">
                <Input
                  placeholder="Device"
                  value={device.Device}
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

                <Select
                  placeholder="OrgAssignment" 
                  value={orgAssignment} 
                  onChange={(e) => handleOrgAssignmentChange(e.target.value)}
                  size="md"
                  width="250px"
                  textAlign="center">

                  {orgAssignments.map((org, index) => (
                    <option key={index} value={org.Name}>{org.Name}</option>
                  ))}

                </Select>

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

                <Select 
                  placeholder="UpdatedBy" 
                  value={updatedBy} 
                  onChange={(e) => setUpdatedBy(e.target.value)}
                  size="md"
                  width="250px"
                  textAlign="center">

                  {orgAssignments.map((org, index) => (
                    <option key={index} value={org.Email}>{org.Email}</option>
                  ))}

                </Select>

                <Button colorScheme="blue" type="submit">
                  Add Test
                </Button>
                <Button colorScheme="gray" onClick={onClose}>
                  Cancel
                </Button>

              </Stack>
               
            </ModalBody>
    
            <ModalFooter>
              
            </ModalFooter>
            </form>
            </ModalContent>
          </Modal>
      </>

      </Stack>
      
      </Stack>
    );
  };

  return (
    <Stack align="center" spacing={5}>

      <form onSubmit={handleSubmit}>
      <Stack>
      
        <Box align="center">
          <label >Add Device Name </label>
          <Input
            focusBorderColor='green'
            variant='filled'
            type="text"
            name="Device"
            value={name}
            onChange={handleNameChange}/>
        </Box>
      
      <Stack align="center">
        <Button colorScheme={"teal"} onClick={handleSubmit} >
          Add Device
        </Button>
      </Stack>

    </Stack>
    
    </form>
    <Stack direction="row" wrap="wrap" justifyContent="center">
      {devices.map(renderDeviceBox)}
    </Stack>

    <Button colorScheme="teal" mt={5}>View archived devices</Button>

    </Stack>
  );
};
    export default Demo;