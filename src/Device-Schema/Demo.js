import React, { useEffect, useState } from 'react';
import { vendiaClient } from '../vendiaClient';
import { 
  Box, Input, Stack, Switch, FormControl, FormLabel, Text, Button 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const { client } = vendiaClient();

export const Demo = () => {

  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]);
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    const listTest = async () => {
      const listTestResponse = await client.entities.device.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);

  useEffect(() => {
    if (deviceId) {
      const fetchDevice = async () => {
        const deviceResponse = await client.entities.device.get(deviceId);
        setName(deviceResponse.Name);
        setStatus(deviceResponse.Status);
      };
      fetchDevice();
    }
  }, [deviceId]);

  const addDevice = async () => {
    const addDeviceResponse = await client.entities.device.add({
      Name: name,
      Status: status,
    });
    console.log(addDeviceResponse);
    setDevices([...devices, { Name: name, Status: status }]);
    setName('');
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
  };

  const renderDeviceBox = (device, index) => {
    return (
      <Box 
        key={index} 
        borderWidth="1px" 
        borderRadius="lg" 
        p={4} 
        width="200px" 
        textAlign="center" 
        m={3}
        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)" // This line adds a shadow effect
        _hover={{ boxShadow: "0 6px 12px 0 rgba(0,0,0,0.3)" }} // This line enhances the shadow on hover
      >
        <Text fontSize="xl">{device.Name}</Text>
        <Text>Test Progress: {device.Status ? 'Active' : 'Inactive'}</Text>
        <Button mt={3} onClick={() => handleLinkClick(device.Name)}>View tests</Button>
      </Box>
    );
  };
  

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
              onChange={handleNameChange}
            />
          </Box>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="status-switch" mb="0">
              Active
            </FormLabel>
            <Switch 
              id="status-switch"
              isChecked={status}
              onChange={handleStatusChange}
            />
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
