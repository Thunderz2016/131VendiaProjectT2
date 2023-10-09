import { AddIcon, CalendarIcon, SettingsIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

// npm i @chakra-ui/icons

export default function Sidebar() {
  return (
    <List color ="white" fontSize="1.2em" spacing={5} paddingTop="6px">

        <ListItem>
        <NavLink to="Dashboard">
            <ListIcon as={CalendarIcon}/>
            Dashboard
        </NavLink>
        </ListItem>

        <ListItem>
        <NavLink to="">
            Login 
        </NavLink>
        </ListItem>

        <ListItem>
        <NavLink to="register">
            Register 
        </NavLink>
        </ListItem>
        
        <ListItem>
        <NavLink to="Demo">
            <ListIcon as={AddIcon}/>
            Demo 
        </NavLink>
        </ListItem>

        <ListItem>
        <NavLink to="Account">
            <ListIcon as={SettingsIcon}/>
            Account 
        </NavLink>
        </ListItem>

    </List>

    )
}
