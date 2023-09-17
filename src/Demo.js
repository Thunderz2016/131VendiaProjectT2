import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";

const { client } = vendiaClient();

export const Demo = () => {
    
    const [device, setDevice] = useState();
    const [testID, setTestID] = useState(); // Initialize as 0 or any default integer value
    const [orgAssignment, setOrgAssignment] = useState();
    const [testName, setTestName] = useState() ;
    const [testMethod, setTestMethod] = useState();
    const [notes, setNotes] = useState();
    const [completed, setCompleted] = useState(false); // Initialize as True or any default boolean value
    const [testList, setTestList] = useState() ;
    const [updatedBy, setUpdatedBy] = useState(); // Initialize with an empty string

    useEffect(() => {
        const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
        }

    //listTest();
    }, [])

    const addDevice = async () => {
        const addDeviceResponse = await client.entities.test.add ({
            Device: device, 
            TestID: parseInt(testID),
            OrgAssignment:orgAssignment,
            TestName: testName,
            TestMethod:testMethod,
            Notes:notes,
            Completed: completed,
            UpdatedBy: updatedBy, 
        }) 
        console.log(addDeviceResponse);
    }

    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
        //console.log(device);
    }

    const handleTestIDChange = (event) => {
        setTestID(event.target.value);
        //console.log(device);
    }

    const handleOrgAssignmentChange = (event) => {
        setOrgAssignment(event.target.value);
        //console.log(device);
    }

    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
        //console.log(testName);
    }

    const handleTestMethodChange = (event) => {
        setTestMethod(event.target.value);
        //console.log(device);
    }
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
        //console.log(device);
    }

    const handleCompletedChange = (event) => {
        setCompleted(event.target.value);
        //console.log(device);
    }

    const handleUpdatedByChange = (event) => {
        setUpdatedBy(event.target.value);
        //console.log(device);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDevice();
    }

    console.log(testList)

    return (
        <div>
            Team Zephyr Device Test Tracker
            <div>
            <form onSubmit={handleSubmit}>

                {/*Device Output on website(string)??*/}
                <div>
                    <label>Device </label>
                    <input 
                    type="text"
                    name="Device"
                    value={device}
                    onChange={handleDeviceChange}
                    />
                </div>

                {/* //test id user name place-integer-*/}
                <div>
                <label>TestID </label>
                        <input 
                        type="text"
                        name="TestID"
                        value={testID}
                        onChange={handleTestIDChange}
                        />
                </div>

                {/* //OrgAssignment inputplace for website-string- oh SWAP here w input textnme*/}
                <div>
                <label>OrgAssignment </label>
                        <input 
                        type="text"
                        name="OrgAssignment"
                        value={orgAssignment}
                        onChange={handleOrgAssignmentChange}
                        />
                </div>

                {/*testName(strring) place to input*/}
                <div>
                <label>TestName </label>
                        <input 
                        type="text"
                        name="TestName"
                        value={testName}
                        onChange={handleTestNameChange}
                        />
                </div>
                
                {/* //testMethod place -string-*/}
                <div>
                <label>TestMethod </label>
                        <input 
                        type="text"
                        name="TestMethod"
                        value={testMethod}
                        onChange={handleTestMethodChange}
                        />
                </div>

                {/* //Notes input/Output -string-*/}
                <div>
                <label>Notes </label>
                        <input 
                        type="text"
                        name="Notes"
                        value={notes}
                        onChange={handleNotesChange}
                        />
                </div>

                {/* // completed-this is the boolean- input/Output */}
                <div>
                <label>Completed </label>
                        <input 
                        type="text"
                        name="Completed"
                        value={completed}
                        onChange={handleCompletedChange}
                        />
                </div>

                {/* Add updated by column */}
                <div>
                <label>UpdatedBy </label>
                        <input 
                        type="text"
                        name="UpdatedBy"
                        value={updatedBy}
                        onChange={handleUpdatedByChange}
                        />
                </div>

                <input type="Submit" />
            </form>
            <div>
                {testList?.map((item, index) => (
                    <div key={index}>
                        {item?.TestID}
                    </div>
                ))
                }
            </div>
            </div>
        </div>
    )
};