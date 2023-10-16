
import React, { useEffect, useState } from "react";
import { Input, Button, Text, Stack, Select } from "@chakra-ui/react";
import { vendiaClient } from "../vendiaClient";

const { client } = vendiaClient();

export const UpdateDevice = () => {
  const [deviceId, setDeviceId] = useState("");
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [testList, setTestList] = useState([]); // Define testList state

  // Function to update the device information
  const updateDevice = async () => {
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

    console.log(updateDeviceResponse);
  };

  useEffect(() => {
    if (deviceId) {
      const fetchDevice = async () => {
        const deviceResponse = await client.entities.test.get(deviceId);

        setDevice(deviceResponse.Device);
        setTestID(deviceResponse.TestID.toString());
        setOrgAssignment(deviceResponse.OrgAssignment);
        setTestName(deviceResponse.TestName);
        setTestMethod(deviceResponse.TestMethod);
        setNotes(deviceResponse.Notes);
        setCompleted(deviceResponse.Completed);
        setUpdatedBy(deviceResponse.UpdatedBy);
      };

      fetchDevice();
    }
  }, [deviceId]);

  // Fetch the list of tests when the component mounts
  useEffect(() => {
    const listTest = async () => {
      const listTestResponse = await client.entities.test.list();
      setTestList(listTestResponse?.items);
    };

    listTest();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDevice();
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Update Device</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} direction="column" align="center" justify="center">

          <Select
            placeholder="Select option"
            //value={selectedOption}
            value={deviceId}
            //onChange={(e) => setSelectedOption(e.target.value)}
            onChange={(e) => setDeviceId(e.target.value)}
            size="md"
            width="500px"
            textAlign="center">
            {testList.map((test, index) => (
              <option key={test._id} value={test._id}>
                {test.Device} - {test.OrgAssignment}
              </option>
            ))}
          </Select>

          <Input
            placeholder="Device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            size="md"
            width="500px"
            textAlign="center"
          />

          <Input
            placeholder="TestID[Integer]"
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
            placeholder="Completed[Boolean]"
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