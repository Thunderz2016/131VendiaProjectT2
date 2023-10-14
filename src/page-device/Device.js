// add devices with various attributes to a database

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { vendiaClient } from "../vendiaClient";
import {
  Input, Button,
  Text, Box,
  Stack, Table,
  Thead, Tbody,
  Tr,Th, Td,
} from "@chakra-ui/react";

const { client } = vendiaClient();

export const Device = () => {
  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search);
  const textParam = searchParams.get("text"); // Get the 'text' parameter from the URL

  const [devices, setDevices] = useState([
    {
      Device: textParam || "Device #",
      testID: "",
      orgAssignment: "",
      testName: "",
      testMethod: "",
      notes: "",
      completed: "",
      updatedBy: "",
    },
  ]);

  const [authUser, setAuthUser] = useState(null);
  
  //const [deviceName, setDeviceName] = useState(""); // Hidden device name

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  // Function to add a device to the database
  const addDevice = async () => {
    for (const deviceData of devices) {
      console.log('Device Data:', deviceData);
      const addDeviceResponse = await client.entities.test.add({
        Device: deviceData.Device, // Set the device name here
        TestID: parseInt(deviceData.testID),
        OrgAssignment: deviceData.orgAssignment,
        TestName: deviceData.testName,
        TestMethod: deviceData.testMethod,
        Notes: deviceData.notes,
        Completed: Boolean(deviceData.completed),
        UpdatedBy: deviceData.updatedBy,
      });
      console.log(addDeviceResponse);
    }
  };
  

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    addDevice();
  };

  // Function to add a new row to the devices array
  const addRow = () => {
    setDevices([...devices, { ...devices[0] }]); // Add a new row with the same initial values as the first row
  };

  return (
    <Stack spacing={4} >
       <Text fontSize="xl" align="center">
        {textParam || "Device Add Page"} {/* Display the textParam or default title */}
      </Text>

      <Box overflowX="auto" align="center">

        <Table>
          <Thead>
            <Tr>
              <Th>Device</Th>
              <Th>TestID</Th>
              <Th>OrgAssignment</Th>
              <Th>TestName</Th>
              <Th>TestMethod</Th>
              <Th>Notes</Th>
              <Th>Completed</Th>
              <Th>UpdatedBy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device, index) => (
              <Tr key={index}>
                <Td>
                  {/* Device */}
                  <Input
                    placeholder="Device #"
                    //value={textParam || "Device #"}
                    value={device.Device}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, Device: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* TestID[integer] */}
                  <Input
                    placeholder="TestID"
                    value={device.testID}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, testID: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"/>

                </Td>

                <Td>
                  {/* OrgAssignment */}
                  <Input
                    placeholder="OrgAssignment"
                    value={device.orgAssignment}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, orgAssignment: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* TestName */}
                  <Input
                    placeholder="TestName"
                    value={device.testName}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, testName: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* TestMethod */}
                  <Input
                    placeholder="TestMethod"
                    value={device.testMethod}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, testMethod: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* Notes */}
                  <Input
                    placeholder="Notes"
                    value={device.notes}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, notes: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* Completed */}
                  <Input
                    placeholder="Completed"
                    value={device.completed}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, completed: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>

                <Td>
                  {/* Updatedby */}
                  <Input
                    placeholder="Updatedby"
                    value={device.updatedBy}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, i) =>
                          i === index
                            ? { ...prevDevice, updatedBy: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  />
                </Td>
              </Tr>
              
            ))}
          </Tbody>
        </Table>
        
      </Box>

      <Stack align="center">

      <Button colorScheme="blue" onClick={addRow} >
        Add Row
      </Button>

      <Button colorScheme="blue" onClick={handleSubmit} >
        Add Device
      </Button>

      </Stack>

    </Stack>
  );
};

export default Device;