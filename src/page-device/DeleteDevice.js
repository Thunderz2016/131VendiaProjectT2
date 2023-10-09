import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack } from "@chakra-ui/react";
import { Button, Text, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const { client } = vendiaClient();

export const DeleteDevice = () => {
    const [deviceId, setDeviceId] = useState(""); // Add deviceId state for updating/removing
    const navigate = useNavigate();

    const { deviceId: paramDeviceId } = useParams(); // Assuming you have a route parameter for device ID

    useEffect(() => {
      if (paramDeviceId) {
        // Set the deviceId state based on the route parameter
        setDeviceId(paramDeviceId);
      }
    }, [paramDeviceId]);

    const deleteDevice = async () => {
        try {
          // Delete the device based on the deviceId
          await client.entities.test.remove(deviceId);
          // Redirect to the device list page or any other desired page
          navigate("/device");
        } catch (error) {
          console.error("Error deleting device:", error);
        }
      };

    const removeDevice = (event) => {
        event.preventDefault();
        deleteDevice();
      };
    
    return(
        <Stack spacing={4}>
        <Text fontSize="xl" align="center">Update Device</Text>
        <form onSubmit={removeDevice}>
        <Stack spacing={4} direction="column" align="center" justify="center">
            <Input
            placeholder="Device ID to Remove"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"/>
        <Button colorScheme="red" type="submit">
          Remove Device
        </Button>
      </Stack>
      </form>
      </Stack>
    


    );

};

export default DeleteDevice;