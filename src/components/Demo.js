import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

//import 'bootstrap/dist/css/bootstrap.css'

const { client } = vendiaClient();

export const Demo = () => {
    
    const [device, setDevice] = useState();
    const [testID, setTestID] = useState(); // Initialize as 0 or any default integer value
    const [orgAssignment, setOrgAssignment] = useState();
    const [testName, setTestName] = useState() ;
    const [testMethod, setTestMethod] = useState();
    const [notes, setNotes] = useState();
    const [completed, setCompleted] = useState(); // Initialize as True or any default boolean value
    const [testList, setTestList] = useState() ;
    const [updatedBy, setUpdatedBy] = useState(); // Initialize with an empty string
    const [authUser, setAuthUser] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        // List all the Test
         const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
        }

    //listTest();
    }, [])
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setAuthUser(user); // Set the user object when the authentication state changes
        });
      }, []);
      

    const addDevice = async () => {
        // Add a new product
        const addDeviceResponse = await client.entities.test.add ({
            Device: device,
            TestID: parseInt(testID),
            OrgAssignment:orgAssignment,
            TestName: testName,
            TestMethod:testMethod,
            Notes:notes,
            Completed: Boolean(completed),
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

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
            navigate('/login');
        })
        .catch(error => console.log(error));
    };
      
    //console.log(testList)

    return (
        <div>
            Team Zephyr Device Test Tracker
            <div>
                <label>Device 1</label>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
 {/*// start horizonal change here*/}
                {/*Device Output on website(string)??*/}
                <div className="hstack gab-2">    
                <label className="p-2">Device:
                    <input 
                    type="text"
                    name="Device"
                    value={device}
                    onChange={handleDeviceChange}
                    />
                    </label>
                </div>

                {/* //test id user name place-integer-*/}
                <div className="hstack gab-3">
                <label className="p-2">TestID:
                        <input 
                        type="text"
                        name="TestID"
                        value={testID}
                        onChange={handleTestIDChange}
                        />
                        </label>
                </div>

                {/* //OrgAssignment inputplace for website-string- oh SWAP here w input textnme*/}
                <div className="hstack gab-3">
                <label>OrgAssignment: </label>
                        <input 
                        type="text"
                        name="OrgAssignment"
                        value={orgAssignment}
                        onChange={handleOrgAssignmentChange}
                        />
                </div>

                {/*testName(strring) place to input*/}
                <div className="hstack gab-3">
                <label>TestName: </label>
                        <input 
                        type="text"
                        name="TestName"
                        value={testName}
                        onChange={handleTestNameChange}
                        />
                </div>
                
                {/* //testMethod place -string-*/}
                <div className="hstack gab-3">
                <label>TestMethod: </label>
                        <input 
                        type="text"
                        name="TestMethod"
                        value={testMethod}
                        onChange={handleTestMethodChange}
                        />
                </div>

                {/* //Notes input/Output -string-*/}
                <div className="hstack gab-3">
                <label>Notes: </label>
                        <input 
                        type="text"
                        name="Notes"
                        value={notes}
                        onChange={handleNotesChange}
                        />
                </div>

                {/* // completed-this is the boolean- input/Output */}
                <div className="hstack gab-3">
                <label>Completed: </label>
                        <input 
                        type="text"
                        name="Completed"
                        value={completed}
                        onChange={handleCompletedChange}
                        />
                </div>

                {/* Add updated by column */}
                <div className="hstack gab-3">
                <label>UpdatedBy: </label>
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
                {authUser ? <><p>{`Signed In as ${authUser.email}`}
                </p> <button onClick={userSignOut}>SignOut</button></>: <p>Signed Out</p>}
            </div>

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

export default Demo;