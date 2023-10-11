// Importing necessary React components and hooks from external libraries
import React, { useEffect, useState } from "react";
//import { useNavigate, useParams } from "react-router-dom"; // Using React Router for navigation
import { Input, Button, Text, Stack } from "@chakra-ui/react";
import { vendiaClient } from "../vendiaClient"; // Importing a custom client from a module

const { client } = vendiaClient();

// Defining a functional component called UpdateDevice
export const UpdateDevice = () => {

  // Defining multiple state variables to store form input values and other data
  const [deviceId, setDeviceId] = useState(""); 
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  //const [testList, setTestList] = useState([]); // State for a list of tests (not used in this code)
  const [updatedBy, setUpdatedBy] = useState("");

  //const navigate = useNavigate(); // Using React Router's 'useNavigate' hook for navigation

  // useEffect hook to fetch device information when 'deviceId' changes
  useEffect(() => {
    if (orgAssignment) {

    // Fetch the device information
    const fetchDevice = async () => {
      const deviceResponse = await client.entities.test.get(orgAssignment);

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

    fetchDevice(); // Calling the fetchDevice function when 'orgAssignment' changes
  }
  }, [orgAssignment]); // The effect runs whenever 'orgAssignment' changes


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
    // navigate("/device"); (commented out)
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Preventing the default form submission behavior
    updateDevice(); // Calling the updateDevice function to update the device
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Update Device</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} direction="column" align="center" justify="center">

          <Input
            placeholder="Device ID to Update"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="Device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="TestID"
            value={testID}
            onChange={(e) => setTestID(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="OrgAssignment"
            value={orgAssignment}
            onChange={(e) => setOrgAssignment(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="TestName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="TestMethod"
            value={testMethod}
            onChange={(e) => setTestMethod(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="Completed"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="UpdatedBy"
            value={updatedBy}
            onChange={(e) => setUpdatedBy(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />
        
        <Button colorScheme="blue" type="submit">
          Update Device
        </Button>

        </Stack>
      </form>
    </Stack>
  );
};

export default UpdateDevice;