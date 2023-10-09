import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { Stack, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const { client } = vendiaClient();

export const List = () => {

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

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">List Device Page</Text>
  
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
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Stack>
  );
  
};

export default List;