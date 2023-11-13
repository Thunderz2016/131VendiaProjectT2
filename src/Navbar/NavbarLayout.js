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

  return (
    <div>
      <Layout />
      <Tabs align="center" isFitted="true">
        <TabList>

            <Tab>
            <Link to="/Homepage">
              <StarIcon paddingRight={1} />
              Home Page
              </Link>
            </Tab>


          <Tab>
            <AddIcon paddingRight={1} />
            <Link to="/Device">Add Device</Link>
          </Tab>
          <Tab>
            <EditIcon paddingRight={1} />
            Device Update
          </Tab>
          <Tab>
            <DeleteIcon paddingRight={1} />
            Delete
          </Tab>
          <Tab>
            <CalendarIcon paddingRight={1} />
            AgGridTable
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Demo />
          </TabPanel>
          <TabPanel>
            <Device />
          </TabPanel>
          <TabPanel>
            <UpdateDevice />
          </TabPanel>
          <TabPanel>
            <DeleteDevice />
          </TabPanel>
          <TabPanel>
            <AgGridTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
