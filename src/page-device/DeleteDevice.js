import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack } from "@chakra-ui/react";
import { Button, Text, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserRole, currentUserEmail } from "../firebase";

const { client } = vendiaClient();

export const DeleteDevice = () => {
  const [deviceId, setDeviceId] = useState(""); // Add deviceId state for updating/removing
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [devices, setDevices] = useState([]);
  const [testList, setTestList] = useState([]); // Define testList state
  const [device, setDevice] = useState([]);
  const [testId, setTestId] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  const { deviceId: paramDeviceId } = useParams(); // Assuming you have a route parameter for device ID

  useEffect(() => {
    const listTests = async () => {
      try {
        const listTestsResponse = await client.entities.test.list({
          readMode: "NODE_LEDGERED",
        });
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
        const listDevicesResponse = await client.entities.device.list({
          readMode: "NODE_LEDGERED",
        });
        setDevices(listDevicesResponse?.items);

        // Log the response to check if data is being fetched
        console.log("List of devices:", listDevicesResponse?.items);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    listDevices();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, setAuthUser); // Directly set the user when authentication state changes
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(currentUserEmail);
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  if (userRole !== "admin") {
    return <div>You do not have permission to view this page.</div>;
  }

  const deleteTest = async () => {
    try {
      // Delete the device based on the deviceId
      await client.entities.test.remove(testId);
      // Redirect to the device list page or any other desired page
      // navigate("/device");
      console.log("Success deleted Test");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const deleteDevice = async () => {
    try {
      // Delete the device based on the deviceId

      const device = await client.entities.device.get(deviceId);
      console.log("the device is:::: ", device);

      await deleteTestsinDevice(device);

      await client.entities.device.remove(deviceId);

      console.log("Successfully deleted Device");
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const deleteTestsinDevice = async (device) => {
    const { items: tests } = await client.entities.test.list({
      readMode: "NODE_LEDGERED",
    });
    console.log("The tests are ", tests);

    console.log("Device :", device);
    const { Name: deviceName, _id: deviceId } = device;
    console.log("deviceName :", deviceName);
    console.log("deviceId :", deviceId);

    for (const test of tests) {
      console.log("TEST: ", test.Device);

      if (test.Device === deviceName) {
        //delete the tests asscoicated with the deleted device
        console.log("found deleted device in test, deleting test...");
        await client.entities.test.remove(test._id);
      }
    }
  };

  const removeDevice = (event) => {
    event.preventDefault();
    deleteDevice();
  };

  const removeTest = (event) => {
    event.preventDefault();
    deleteTest();
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">
        Delete{" "}
      </Text>

      {/* Remove Tests Schema*/}
      <form onSubmit={removeTest}>
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
                {device.Name} - {(device.Status ?? "").toString()}
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
