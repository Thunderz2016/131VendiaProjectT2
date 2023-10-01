import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Input, Button, Text, Box, Stack, } from "@chakra-ui/react";
import { vendiaClient } from "../vendiaClient";

const { client } = vendiaClient();

export const DeviceTwo = () => {
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);
  const [testList, setTestList] = useState([]);
  const [updatedBy, setUpdatedBy] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);

  const navigate = useNavigate();

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
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  const addDevice = async () => {
    // Add a new product
    const addDeviceResponse = await client.entities.test.add({
      Device: device,
      TestID: parseInt(testID),
      OrgAssignment: orgAssignment,
      TestName: testName,
      TestMethod: testMethod,
      Notes: notes,
      Completed: Boolean(completed),
      UpdatedBy: updatedBy,
    });
    console.log(addDeviceResponse);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDevice();
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const filterTests = () => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const filtered = testList.filter((test) => {
      return (
        test.TestName.toLowerCase().includes(lowerSearchQuery) ||
        test.OrgAssignment.toLowerCase().includes(lowerSearchQuery)
      );
    });
    setFilteredTests(filtered);
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl">DeviceTwo Page</Text>

      {/* Search box */}
      <Input htmlSize={5} width='200px'
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {filteredTests.map((item, index) => (
          <Box key={index} p={4} borderBottomWidth="1px">
            <Text>{`TestID: ${item.TestID}`}</Text>
            <Text>{`Device: ${item.Device}`}</Text>
            <Text>{`OrgAssignment: ${item.OrgAssignment}`}</Text>
            <Text>{`TestName: ${item.TestName}`}</Text>
            <Text>{`TestMethod: ${item.TestMethod}`}</Text>
            <Text>{`Notes: ${item.Notes}`}</Text>
            <Text>{`Completed: ${item.Completed}`}</Text>
            <Text>{`UpdatedBy: ${item.UpdatedBy}`}</Text>
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4} direction="column" align="center" justify="center">
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
            Add Device
          </Button>
        </Stack>
      </form>

      {authUser ? (
        <>
          <Text>{`Signed In as ${authUser.email}`}</Text>
          <Button colorScheme="red" onClick={userSignOut}>
            Sign Out
          </Button>
        </> 
          ) : ( 
          <Text textAlign="center">Signed Out</Text>
      )}
    </Stack>
  );
};

export default DeviceTwo;