import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack } from "@chakra-ui/react";
import { Button, Text, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";

const { client } = vendiaClient();

export const DeleteDevice = () => {
  const [deviceId, setDeviceId] = useState(""); // Add deviceId state for updating/removing
  const [testList, setTestList] = useState([]); // Define testList state

  const navigate = useNavigate();

  const { deviceId: paramDeviceId } = useParams(); // Assuming you have a route parameter for device ID

  useEffect(() => {
    const listTest = async () => {
      try {
        const listTestResponse = await client.entities.test.list();
        setTestList(listTestResponse?.items);
  
        // Log the response to check if data is being fetched
        console.log("List of devices:", listTestResponse?.items);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
  
    listTest();
  }, []);
  

  const deleteDevice = async () => {
    try {
      // Delete the device based on the deviceId
      await client.entities.test.remove(deviceId);
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
      <Text fontSize="xl" align="center">Delete Device</Text>
      <form onSubmit={removeDevice}>
        <Stack spacing={4} direction="column" align="center" justify="center">

          <Select
            placeholder="Select device to delete"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
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
            Remove Device
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default DeleteDevice;