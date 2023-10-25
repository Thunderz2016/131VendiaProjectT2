import React, { useEffect, useState } from "react";
import { Input, Button, Text, Stack, Select } from "@chakra-ui/react";
import { vendiaClient } from "../vendiaClient";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const { client } = vendiaClient();
const auth = getAuth();

// UpdateDevice component
export const UpdateDevice = () => {
  const [deviceId, setDeviceId] = useState("");
  // For Vendia
  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState("");
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  // Others
  const [testList, setTestList] = useState([]); // Define testList state
  const [allowedEmails, setAllowedEmails] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true)
  const [allowedOrgNames, setAllowedOrgNames] = useState([]);
  const [emailToOrgNameMap, setEmailToOrgNameMap] = useState({});

  // Fetching allowed emails
  useEffect(() => {
    const fetchAllowedEmails = async () => {
      const allowedEmailsResponse = await client.entities.orgs.list();
      setAllowedEmails(allowedEmailsResponse?.items.map(org => org.Email));
    };
    fetchAllowedEmails();
  }, []);

  // Fetching From Orgs Schema
  useEffect(() => {
    const fetchAllowedOrgNames = async () => {
      const allowedOrgsResponse = await client.entities.orgs.list();
      setAllowedOrgNames(allowedOrgsResponse?.items.map(org => org.Name));
    };
    fetchAllowedOrgNames();
  }, []);

  // Fetching organization details to map emails to organization names
  useEffect(() => {
    const fetchOrgDetails = async () => {
        const orgsResponse = await client.entities.orgs.list();
        const map = {};

        orgsResponse?.items.forEach(org => {
            if (!map[org.Email]) {
                map[org.Email] = [];
            }
            map[org.Email].push(org.Name);
        });

        setEmailToOrgNameMap(map);
    };
    fetchOrgDetails();
  }, []);


  // Function to update the device information
  const updateDevice = async () => {
    // Authentication
    const currentUserEmail = auth.currentUser?.email;
    const allowedOrgNames = emailToOrgNameMap[currentUserEmail];

    if (!allowedEmails.includes(currentUserEmail)) {
      console.error("Cannot Access: You are not allowed to update.");
      return;
    }
  
    if (!allowedOrgNames) {
      console.error("Cannot Access: You are not associated with any organization.");
      return;
    }
  
    // Only allow updates if the orgAssignment matches the user's organization
    if (!allowedOrgNames.includes(orgAssignment)) {
      console.error(`Cannot Access: You can only update ${allowedOrgNames.join(", ")}.`);
      return;
    }
     
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

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDevice();
  };
{/*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUpdatedBy(user.email);
            const allowedOrgNames = emailToOrgNameMap[user.email];

            // Check if the user is authenticated and the orgAssignment is one of their organizations
            if (allowedOrgNames && allowedOrgNames.includes(orgAssignment)) {
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        } else {
            setIsDisabled(true);
        }
    });

    // Cleanup listener on unmount
    return () => {
        unsubscribe();
    };
  }, [orgAssignment, emailToOrgNameMap]);
*/}

  return (
    <Stack spacing={4}>
      <Text fontSize="xl" align="center">Update Device</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} direction="column" align="center" justify="center">

          <Select

            placeholder="Select option"
            value={deviceId}
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
            isDisabled={isDisabled}

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