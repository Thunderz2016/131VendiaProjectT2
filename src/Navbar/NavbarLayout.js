import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { Divider, List } from "@chakra-ui/react";
import LinkLayout from "./LinkLayout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import DeleteDevice from "../page-device/DeleteDevice";
import {
    StarIcon,
    AddIcon,
    EditIcon,
    DeleteIcon,
    CalendarIcon,
} from "@chakra-ui/icons";
import Device from "../page-device/Device";
import UpdateDevice from "../page-device/DeviceUpdate";
import AgGridTable from "../page-device/AgGridTable";
import ListID from "../page-device/ListID";
import Demo from "../Device-Schema/Homepage";
import { Link } from "react-router-dom";

export default function NavbarLayout() {
    /*return (
        <div>
            <Layout />
            <Divider orientation='horizontal' />
            <LinkLayout/> 
            <Outlet />
        </div>
    )*/

    var path = window.location.href; // Get current URL
    var index; // Index for determining active tab

    // This is a botch but should work assuming no further changes would be made to the navbar
    if (path.includes("/Homepage")) {
        index = 0;
    } else if (path.includes("/Device")) {
        index = 1;
    } else if (path.includes("/AgGridTable")) {
        index = 2;
    } else if (path.includes("/DeleteDevice")) {
        index = 3;
    }

    return (
        <div>
            <Layout />
            <Tabs isFitted="true" align="center" defaultIndex={index}>
                <TabList>
                    <Link to="/Homepage">
                        <Tab>
                            <StarIcon paddingRight={1} />
                            Home Page
                        </Tab>
                    </Link>

                    <Link to="/Device">
                        <Tab >
                            <AddIcon paddingRight={1} />
                            Add Device
                        </Tab>
                    </Link>

                    <Link to="/AgGridTable">
                        <Tab>
                            <CalendarIcon paddingRight={1} />
                            List/Update
                        </Tab>
                    </Link>

                    <Link to="/DeleteDevice">
                        <Tab>
                            <AddIcon paddingRight={1} />
                            Delete
                        </Tab>
                    </Link>
                </TabList>
            </Tabs>
            <Outlet />
        </div>
    );
}
