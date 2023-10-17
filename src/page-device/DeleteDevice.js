import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack } from "@chakra-ui/react";
import { Button, Text, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";

const { client } = vendiaClient();

export const DeleteDevice = () => {
  const [deviceId, setDeviceId] = useState(""); // Add deviceId state for updating/removing
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]); 
  const [testList, setTestList] = useState([]); // Define testList state
  const [device, setDevice] = useState([]);
  const [testId, setTestId] = useState(""); 


  const navigate = useNavigate();

  const { deviceId: paramDeviceId } = useParams(); // Assuming you have a route parameter for device ID

  useEffect(() => {
    const listTests = async () => {
      try {
        const listTestsResponse = await client.entities.test.list();
        setTestList(listTestsResponse?.items);
  
        // Log the response to check if data is being fetched
        console.log("List of tests:", listTestsResponse?.items);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
  
    listTests();
  }, []);

  useEffect(() => {
    const listDevices = async () => {
      try {
        const listDevicesResponse = await client.entities.device.list();
        setDevices(listDevicesResponse?.items);
  
        // Log the response to check if data is being fetched
        console.log("List of devices:", listDevicesResponse?.items);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
  
    listDevices();
  }, []);
  

  const deleteTest = async () => {
    try {
      // Delete the device based on the deviceId
      await client.entities.test.remove(testId);
      // Redirect to the device list page or any other desired page
      // navigate("/device");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const deleteDevice = async () => {
    try {
      // Delete the device based on the deviceId
      await client.entities.device.remove(deviceId);
      // Redirect to the device list page or any other desired page
      // navigate("/device");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const removeDevice = (event) => {
    event.preventDefault();
    deleteDevice();
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Delete </Text>


      {/* Remove Tests Schema*/}
      <form onSubmit={removeDevice}>
        <Stack spacing={4} direction="column" align="center" justify="center">

          <Select
            placeholder="Select test to delete"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
            >
            {testList.map((test, index) => (
              <option key={test._id} value={test._id}>
                {test.Device} - {test.OrgAssignment}
              </option>
            ))}
          </Select>

          <Button colorScheme="red" type="submit">
            Remove Test
          </Button>
        </Stack>
      </form>
        
      {/* Remove Device Schema*/}
      <form onSubmit={removeDevice}>
      <Stack spacing={4} direction="column" align="center" justify="center">

      <Select
        placeholder="Select Device to delete"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        size="md"
        width="500px"
        textAlign="center"
        >
          {devices.map((device, index) => (
            <option key={device._id} value={device._id}>
                {device.Name} - {(device.Status ?? '').toString()}
            </option>
            ))}
      </Select>

          <Button colorScheme="red" type="submit">
            Remove Device
          </Button>

      </Stack>

      </form>
    </Stack>

    

    
  );
};

export default DeleteDevice;