import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { vendiaClient } from "../vendiaClient";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ModuleRegistry } from '@ag-grid-community/core';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import 'ag-grid-enterprise'; // Import this for enterprise features

import { db } from "../firebase"; // Assuming you've exported db from firebase.js
import { doc, getDoc } from "firebase/firestore";


ModuleRegistry.registerModules([SideBarModule]);

const { client } = vendiaClient();
const auth = getAuth();

export const AgGridTable = () => {
    const [testList, setTestList] = useState([]);
    const [emailToOrgNameMap, setEmailToOrgNameMap] = useState({});
    const [updatedBy, setUpdatedBy] = useState("");
    const [showSideBar, setShowSideBar] = useState(false);
    const ADMIN_EMAILS = ["teamzephyr2023@gmail.com"]; // Add your admin emails here

    const isAdminEmail = async (email) => {
        const userRef = doc(db, 'users', email); // Assuming you use email as the document ID
        const userDoc = await getDoc(userRef);
    
        if (userDoc.exists() && userDoc.data().role === 'admin') {
            return true;
        }
        return false;
    };
    

    const isValidUpdate = async (email, orgAssignment) => {
        // If the email belongs to an admin, return true immediately
        if (await isAdminEmail(email)) {
            return true;
        }
        return emailToOrgNameMap[email]?.includes(orgAssignment);
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
            console.log("Email to Org Name Map:", map);
        };

        const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            setTestList(listTestResponse?.items);
        };

        fetchOrgDetails();
        listTest();
    }, []);

    // AgGridReact component props and methods
    const columnDefs = [
        { headerName: "Device", field: "Device", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true},
        { headerName: "TestID", field: "TestID", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true },
        { headerName: "OrgAssignment", field: "OrgAssignment", filter: 'agMultiColumnFilter', editable: false, enableRowGroup: true, sort: 'asc' },
        { headerName: "TestName", field: "TestName", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true },
        { headerName: "TestMethod", field: "TestMethod", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true },
        { headerName: "Notes", field: "Notes", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true },
        { headerName: "Completed", field: "Completed", filter: 'agMultiColumnFilter', editable: true, enableRowGroup: true },
        { headerName: "UpdatedBy", field: "UpdatedBy", filter: 'agMultiColumnFilter', editable: false, enableRowGroup: true },
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
        floatingFilter: true,
        menuTabs: ['filterMenuTab'],
    };

    const autoGroupColumnDef = {
        minWidth: 200,
    };    

    const handleCellValueChanged = async (params) => {
        const { colDef: { field }, 
                newValue, 
                data: rowData } = params;

        rowData[field] = newValue;

        await updateDevice(rowData);
    };

    const updateDevice = async (rowData) => {

        // Authentication - get current user's email address
        const currentUserEmail = auth.currentUser?.email;
        console.log("currentUserEmail:", currentUserEmail);

        // Check if the current user is allowed to update
        if (!(await isValidUpdate(currentUserEmail, rowData.OrgAssignment))) {
            console.log("Cannot Access: You are not allowed to update.");
            alert("Invalid email or organization. You are not allowed to access this.");
            return;
        }

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUpdatedBy(user.email);
            }
        });
    
        return () => unsubscribe();
    }, []);
    
    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>

            <AgGridReact

                rowData={testList}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                autoGroupColumnDef={autoGroupColumnDef} // Added this property
                onCellValueChanged={handleCellValueChanged}
                domLayout='autoHeight'
                animateRows={true}
                rowGroupPanelShow={'always'} // Show the row grouping panel always

            />

        </div>
    );
};

export default AgGridTable;