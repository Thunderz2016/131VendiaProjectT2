import React, { useEffect, useState } from 'react'
import { vendiaClient } from '../vendiaClient';
import { Box, Input, Stack, Flex, Switch, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const { client } = vendiaClient();

export const Demo = () => {

  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]);  // State for list of devices
  const [percentage, setPercentage] = useState({});

  useEffect(() => {
    // Fetch the list of devices in the device schema
    const fetchData = async () => {
      const listDeviceResponse = await client.entities.device.list();
      setDevices(listDeviceResponse?.items);
      console.log(listDeviceResponse?.items);

      const listTestResponse = await client.entities.test.list();
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
        shadow="lg" // Adds medium shadow
        borderColor="gray.200"
        _hover={{ transform: 'scale(1.20)', shadow: 'lg' }} // Scales up and increases shadow on hover for a 3D effect
      >
        <Text fontSize="xl">{device.Name}</Text>
        <Text>Test Progress: {percentage[device.Name] || 0}%</Text>
        <Link to={`/device?deviceName=${device.Name}`}>
          <Button mt={3} onClick={() => handleLinkClick(device.Name)}>View tests</Button>
        </Link>
      </Box>
    );
  };

  return (
    <Flex direction="row" align="center" w="100%" p={5}>
    {/* Container for Device Boxes */}
    <Flex flex={1} justifyContent="center" p={5}>
      <Stack direction="row" wrap="wrap" justifyContent="center">
        {devices.map(renderDeviceBox)}
      </Stack>
    </Flex>

    {/* Container for the "Add Device" Form */}
    <Flex flex={0.3} direction="column" align="flex-end" p={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} align="flex-end">
          <Box>
            <label>Add Device Name: </label>
            <Input
              type="text"
              name="Device"
              value={name}
              onChange={handleNameChange}
            />
          </Box>
          <Button colorScheme="blue" type="submit">
            Add Device
          </Button>
        </Stack>
      </form>
    </Flex>
  </Flex>
);
};

export default Demo;