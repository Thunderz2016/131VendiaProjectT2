import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { vendiaClient } from "../vendiaClient";
import {
  Input, Button, Text, Box,
  Stack, Table, Thead, Tbody,
  Tr, Th, Td, Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { getUserRole, currentUserEmail } from "../firebase"; 

const { client } = vendiaClient();

export const Device = () => {

  const toast = useToast(); // Initialize the toast component
  
  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search);
  const textParam = searchParams.get("text"); // Get the 'text' parameter from the URL
  const deviceNameFromUrl = searchParams.get("deviceName");
  const [testList, setTestList] = useState([]); // Define testList state
  const [userRole, setUserRole] = useState(null); // Define state variable and setter
  const [selectedOrgEmail, setSelectedOrgEmail] = useState("");
  const [email, setEmail] = useState("");

  const createNewDevice = () => ({
    Device: deviceNameFromUrl || "Device #",
    testID: "",
    orgAssignment: "",
    testName: "",
    testMethod: "",
    notes: "",
    completed: "",
    updatedBy: "",
  });

  const [devices, setDevices] = useState([createNewDevice()]);

  const addOrg = async () => {
  const addOrgResponse = await client.entities.orgs.update({
    _id: deviceId,
    Name: name,
    Email: email,
  });
    console.log(addOrgResponse);
  };

  useEffect(() => {
    if (deviceId) {
      const fetchOrg = async () => {
        const deviceResponse = await client.entities.orgs.get(deviceId);

        setName(deviceResponse.Name);
        setEmail(deviceResponse.Email);
      };

      fetchOrg();
    }
  }, [deviceId]);

  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, setAuthUser);  // Directly set the user when authentication state changes
  }, []);

  useEffect(() => {
    const listOrgs = async () => {
      const OrgsResponse = await client.entities.orgs.list({readMode: "NODE_LEDGERED"});
      setTestList(OrgsResponse?.items);
    };

    listOrgs();
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

  // Function to add a device to the database
  const addDevice = async () => {
    try {
      for (const deviceData of devices) {
        console.log('Device Data:', deviceData);
        await client.entities.test.add({
          Device: deviceData.Device, // Set the device name here
          TestID: parseInt(deviceData.testID),
          OrgAssignment: deviceData.orgAssignment,
          TestName: deviceData.testName,
          TestMethod: deviceData.testMethod,
          Notes: deviceData.notes,
          Completed: Boolean(deviceData.completed),
          UpdatedBy: deviceData.updatedBy,
        });
      }
    return 200;
  } catch (error) {
    throw new Error("Failed to add device");
  }};

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the addTests to Schema function
    toast.promise(addDevice(), {
      success: { title: "Success", description: "New Tests added" },
      error: { title: "Error", description: "Failed to add Test to org" },
      loading: { title: "Adding tests", description: "Please wait..." },
    });
  };

  // Function to add a new row to the devices array
  const addRow = () => setDevices([...devices, createNewDevice()]);
  
  return (
    <Stack spacing={4} >
      <Text fontSize="xl" align="center">
        {textParam || "Test Add Page For Per Device"} {/* Display the textParam or default title */}
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

                {/* Device */}
                <Td>  
                  <Input
                    placeholder="Device #"
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

                    {/* TestID[integer] */}
                <Td>
                  
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
                    textAlign="center"
                    />
                </Td>

                    {/* OrgAssignment */}
                <Td>
                  <Select
                    placeholder="Select option"
                    value={device.orgAssignment}
                    onChange={(e) => {
                      const selectedOrg = testList.find(org => org.Name === e.target.value);
                      setSelectedOrgEmail(selectedOrg ? selectedOrg.Email : "");
                      console.log("Selected Org Email:", selectedOrgEmail); // Add this line

                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, idx) =>
                          idx === index
                            ? { ...prevDevice, orgAssignment: e.target.value }
                            : prevDevice
                        )
                      );
                    }}
                    size="md"
                    width="100%"
                    textAlign="center"
                  >
                    {testList.map((org) => (
                      <option key={org.Name} value={org.Name}>
                        {org.Name}
                      </option>
                    ))}
                  </Select>
                </Td>

                      {/* TestName */}
                <Td>
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

                    {/* TestMethod */}
                <Td>
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

                    {/* Notes */}
                <Td>
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

                    {/* Completed */}
                <Td>
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

                    {/* Updatedby */}
                <Td>
                  <Select
                    placeholder="Select option"
                    value={device.updatedBy}
                    onChange={(e) =>
                      setDevices((prevDevices) =>
                        prevDevices.map((prevDevice, idx) =>
                          idx === index
                            ? { ...prevDevice, updatedBy: e.target.value }
                            : prevDevice
                        )
                      )
                    }
                    size="md"
                    width="100%"
                    textAlign="center"
                  >
                  {testList
                  .filter(org => org.Email === selectedOrgEmail)
                  .map((org, index) => (
                    <option key={index} value={org.Email}>
                      {org.Email}
                    </option>
                  ))}

                  </Select>
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
        Add Tests
      </Button>

      </Stack>

    </Stack>
  );
};

export default Device;