import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import UpdateDevice from "./DeviceUpdate";

const { client } = vendiaClient();

export const List = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deviceId, setdeviceId] = useState([]); // Change state variable name to "devices" for storing the list of devices
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [testList, setTestList] = useState([]);

  //const navigate = useNavigate();

  useEffect(() => {
    // List all the Test
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      console.log(listTestResponse?.items);
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);

  useEffect(() => {
    if (deviceId) {
      // Fetch the device information based on the deviceId
      const fetchDevice = async () => {
        const deviceResponse = await client.entities.test.get(deviceId);

        // Setting the retrieved data into respective state variables
        setDevice(deviceResponse.Device);
        setTestID(deviceResponse.TestID.toString());
        setOrgAssignment(deviceResponse.OrgAssignment);
        setTestName(deviceResponse.TestName);
        setTestMethod(deviceResponse.TestMethod);
        setNotes(deviceResponse.Notes);
        setCompleted(deviceResponse.Completed);
        setUpdatedBy(deviceResponse.UpdatedBy);
      };

      fetchDevice(); // Calling the fetchDevice function when 'deviceId' changes
    }
  }, [deviceId]); // The effect runs whenever 'deviceId' changes

  const listDevice = async () => {
    // Add a new prod uct
    const listDeviceResponse = await client.entities.test.list({
      _id: deviceId,
      Device: device,
      TestID: parseInt(testID),
      OrgAssignment: orgAssignment,
      TestName: testName,
      TestMethod: testMethod,
      Notes: notes,
      Completed: Boolean(completed),
      UpdatedBy: updatedBy,
    });
    console.log(listDeviceResponse);
  };

  
  // Function to update the device information
  const updateDevice = async () => {

    // Sending a request to update the device information with the new values
    const updateDeviceResponse = await client.entities.test.update({
      _id: deviceId,
      Device: device,
      TestID: parseInt(testID),
      OrgAssignment: orgAssignment,
      TestName: testName,
      TestMethod: testMethod,
      Notes: notes,
      Completed: Boolean(completed),
      UpdatedBy: updatedBy,
    });
    
    console.log(updateDeviceResponse); // Logging the response (you may want to handle this differently)
    // navigate("/device"); // Redirecting to the device list page after updating (commented out)
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Preventing the default form submission behavior
    updateDevice(); // Calling the updateDevice function to update the device
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">
        List Device Page
      </Text>

      <Stack align="center">
        <>
          <Button onClick={onOpen}>Edit</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Device 1 - Editing</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>TestID</FormLabel>
                  <Input type="Device" />
                </FormControl>

                <FormControl>
                  <FormLabel>OrgAssignment</FormLabel>
                  <Input type="Device" />
                </FormControl>

                <FormControl>
                  <FormLabel>TestName</FormLabel>
                  <Input type="Device" />
                </FormControl>

                <FormControl>
                  <FormLabel>Notes</FormLabel>
                  <Input type="Device" />
                </FormControl>

                <FormControl>
                  <FormLabel>Updated By</FormLabel>
                  <Input type="Device" />
                </FormControl>
              </ModalBody>

              <Menu>
                <MenuButton as={Button} borderRadius="md">
                  Completed
                </MenuButton>
                <MenuList>
                  <MenuItem>True</MenuItem>
                  <MenuItem>False</MenuItem>
                </MenuList>
              </Menu>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Discard
                </Button>
                <Button variant="ghost">Save Changes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Stack>
      <list />

      <Box overflowX="auto" align="center">
        <table>
          <thead>
            <tr>
              <th>Device</th>
              <th>TestID</th>
              <th>OrgAssignment</th>
              <th>TestName</th>
              <th>TestMethod</th>
              <th>Notes</th>
              <th>Completed</th>
              <th>UpdatedBy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {testList.map((test, index) => (
              <tr key={index}>
                <td>{test.Device}</td>
                <td>{test.TestID}</td>
                <td>{test.OrgAssignment}</td>
                <td>{test.TestName}</td>
                <td>{test.TestMethod}</td>
                <td>{test.Notes}</td>
                <td>{test.Completed.toString()}</td>
                <td>{test.UpdatedBy}</td>
                <Button onClick={onOpen}>Update</Button>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Stack>
  );
};

export default List;
