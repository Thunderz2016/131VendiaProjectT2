import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { Divider } from "@chakra-ui/react";
import LinkLayout from "./LinkLayout";

export default function NavbarLayout () {
    return (
        <div>
            <Layout />
            <Divider orientation='horizontal' />
            <LinkLayout/> 
            <Outlet />
        </div>
    )
}