import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { vendiaClient } from "../vendiaClient";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Button, Stack } from "@chakra-ui/react";

const { client } = vendiaClient();
const auth = getAuth();

export const AgGridTable = () => {
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
    const [editedRowData, setEditedRowData] = useState(null);

    // Fetching allowed emails
    useEffect(() => {
        const fetchAllowedEmails = async () => {
          const allowedEmailsResponse = await client.entities.orgs.list();
          setAllowedEmails(allowedEmailsResponse?.items.map(org => org.Email));
        };
        fetchAllowedEmails();
        }, []);

    // Fetching Names of Orgs from Orgs Schema
    useEffect(() => {
        const fetchAllowedOrgNames = async () => {
          const allowedOrgsResponse = await client.entities.orgs.list();
          setAllowedOrgNames(allowedOrgsResponse?.items.map(org => org.Name));
        };
        fetchAllowedOrgNames();
        }, []);

    const columnDefs = [
        { headerName: "Device", field: "Device", editable: true },
        { headerName: "TestID", field: "TestID", editable: true },
        { headerName: "OrgAssignment", field: "OrgAssignment", editable: true },
        { headerName: "TestName", field: "TestName", editable: true },
        { headerName: "TestMethod", field: "TestMethod", editable: true },
        { headerName: "Notes", field: "Notes", editable: true },
        { headerName: "Completed", field: "Completed", editable: true },
        { headerName: "UpdatedBy", field: "UpdatedBy", editable: true }
    ];
    
    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        resizable: true
    };

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
        console.log("Email to Org Name Map:", emailToOrgNameMap);

        };
        fetchOrgDetails();
        }, []);

     // Function to update the device information in the test Schema
    useEffect(() => {
        const listTest = async () => {
          const listTestResponse = await client.entities.test.list();
          setTestList(listTestResponse?.items);
        };
    
        listTest();
        }, []);


    // The function to update the device information
    const handleCellValueChanged = async (params) => {
        const field = params.colDef.field;
        const newValue = params.newValue;
        const rowData = params.data;

        switch (field) {
            case "Device":
                setDevice(newValue);
                break;
            case "TestID":
                setTestID(newValue);
                break;
            case "OrgAssignment":
                setOrgAssignment(newValue);
                break;
            case "TestName":
                setTestName(newValue);
                break;
            case "TestMethod":
                setTestMethod(newValue);
                break;
            case "Notes":
                setNotes(newValue);
                break;
            case "Completed":
                setCompleted(newValue);
                break;
            case "UpdatedBy":
                setUpdatedBy(newValue);
                break;
        }
        await updateDevice(rowData);
    };

    const updateDevice = async (rowData) => { //
        // Authentication
        const currentUserEmail = auth.currentUser?.email;
        console.log("currentUserEmail:", currentUserEmail);

        const allowedOrgNames = emailToOrgNameMap[currentUserEmail];
        console.log("Email to Org Name Map:", emailToOrgNameMap);

        if (!allowedEmails.includes(currentUserEmail)) {
            console.error("Cannot Access: You are not allowed to update.");
            return;
        }
    
        if (!allowedOrgNames) {
            console.error("Cannot Access: You are not associated with any organization.");
            return;
        }
        console.log("allowedOrgNames:", allowedOrgNames);
            
    {/*
        if (!allowedOrgNames.includes(orgAssignment)) {
            console.error(`Cannot Access: You can only update ${allowedOrgNames.join(", ")}.`);
            return;
        }
        console.log("allowedOrgNames:", allowedOrgNames);
    */}

     
        // Extract necessary data from rowData
        const updateDeviceResponse = await client.entities.test.update({
            _id: rowData._id,
            Device: rowData.Device,
            TestID: parseInt(rowData.TestID),
            OrgAssignment: rowData.OrgAssignment,
            TestName: rowData.TestName,
            TestMethod: rowData.TestMethod,
            Notes: rowData.Notes,
            Completed: Boolean(rowData.Completed),
            UpdatedBy: rowData.UpdatedBy,
        });

        console.log(updateDeviceResponse);
        
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
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>

            {/* The table */}
            <AgGridReact
                // The table data
                rowData={testList}
                // The table columns
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                // The table features
                onCellValueChanged={handleCellValueChanged}
                // The table layout
                domLayout='autoHeight'
            />

        </div>

    );
};

export default AgGridTable;