import React, { useEffect, useState } from 'react'
import { vendiaClient } from '../vendiaClient';
import { Box, Input, Stack, Switch, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const { client } = vendiaClient();

export const Demo = () => {

  const [deviceId, setDeviceId] = useState(""); // State for Device ID
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]);  // State for list of devices
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    // List all the Test
    const listTest = async () => {
      const listTestResponse = await client.entities.device.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);


  useEffect(() => {
    if (deviceId) {

    // Fetch the device information based on the deviceId
    const fetchDevice = async () => {
      const deviceResponse = await client.entities.device.get(deviceId);

      // Setting the retrieved data into respective state variables
      setName(deviceResponse.Name);
      setStatus(deviceResponse.Status);
    };
    fetchDevice(); // Calling the fetchDevice function when 'deviceId' changes
  }
  }, [deviceId]); 


  const listDevice = async () => {
    // Add a new prod uct
    const listDeviceResponse = await client.entities.device.list({
      _id: deviceId,
      Name: name,
      Status: Boolean(status),
    });
    console.log(listDeviceResponse);
  };

  const updateDevice = async () => {
    const handleSubmit = (event) => {
      event.preventDefault(); // Preventing the default form submission behavior
      updateDevice(); // Calling the updateDevice function to update the device
    };
  };

  const addDevice = async () => {
    const addDeviceResponse = await client.entities.device.add({
      Name: name,
      Status: status,
    });
    console.log(addDeviceResponse);
    setDevices([...devices, { Name: name, Status: status }]); // Add the new device to the local list
    setName('');  // Reset the input field
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addDevice();
  }
  const handleLinkClick = (deviceId) => {
    console.log(`Device ID: ${deviceId} was clicked`);
    // Here, you can add navigation to another page or perform other actions
  };

  const renderDeviceBox = (device, index) => {
    return (
      <Box key={index} borderWidth="1px" borderRadius="lg" p={4} width="200px" textAlign="center" m={3}>
        <Text fontSize="xl">{device.Name}</Text>
        <Text>Test Progress: {device.Status ? 'Active' : 'Inactive'}</Text>

        <Link to={`/device?deviceName=${device.Name}`}>
          <Button mt={3} onClick={() => handleLinkClick(device.Name)}>View tests</Button>
        </Link>

      </Box>
    );
  };


{/* Kanan Code */}
  return (
    <Stack align="center" spacing={5}>
      <Text 
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='xl'
        fontWeight='extrabold'> TEAM ZEPHYR DEVICE TEST TRACKER </Text>

        <form onSubmit={handleSubmit}>
    <Stack>
      
      <Box>
        <label>Add Device Name </label>
          <Input 
            type="text"
            name="Device"
            value={name}
            onChange={handleNameChange}/>
      </Box>
      
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="status-switch" mb="0">
          Active
        </FormLabel>
          <Switch 
            id="status-switch"
            isChecked={status}
            onChange={handleStatusChange}/>
      </FormControl>
      
      <Stack align="center">
        <Button colorScheme="blue" onClick={handleSubmit} >
          Add Device
        </Button>
      </Stack>

    </Stack>
    
    </form>
    <Stack direction="row" wrap="wrap" justifyContent="center">
      {testList.map(renderDeviceBox)}
    </Stack>

    <Button colorScheme="teal" mt={5}>View archived devices</Button>

    </Stack>
  );
};

export default Demo;