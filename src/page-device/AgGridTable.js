import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { vendiaClient } from "../vendiaClient";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ModuleRegistry } from '@ag-grid-community/core';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import 'ag-grid-enterprise'; // Import this for enterprise features

ModuleRegistry.registerModules([SideBarModule]);

const { client } = vendiaClient();
const auth = getAuth();

export const AgGridTable = () => {
    const [testList, setTestList] = useState([]);
    const [emailToOrgNameMap, setEmailToOrgNameMap] = useState({});
    const [updatedBy, setUpdatedBy] = useState("");

    const isValidUpdate = (email, orgAssignment) => emailToOrgNameMap[email]?.includes(orgAssignment);

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

    const autoGroupColumnDef = {
        headerName: "OrgAssignment",
        minWidth: 200,
        filter: 'agGroupColumnFilter',
    };

    // AgGridReact component props and methods
    const columnDefs = [
        { headerName: "Device", field: "Device", editable: true, rowGroup: true },
        { headerName: "TestID", field: "TestID", editable: true },
        { headerName: "OrgAssignment", field: "OrgAssignment", editable: true },
        { headerName: "TestName", field: "TestName", editable: true },
        { headerName: "TestMethod", field: "TestMethod", editable: true },
        { headerName: "Notes", field: "Notes", editable: true },
        { headerName: "Completed", field: "Completed", editable: true },
        { headerName: "UpdatedBy", field: "UpdatedBy", editable: true },
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        resizable: true,
        sortable: true, // Added sortable
        filter: true,   // Added filter
        floatingFilter: true, // Added floatingFilter
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
        if (!isValidUpdate(currentUserEmail, rowData.OrgAssignment)) {
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
                rowGroupPanelShow={'always'} // Show the row grouping panel always
                sideBar={'filters'} // Show the sidebar for filters

            />

        </div>
    );
};

export default AgGridTable;
