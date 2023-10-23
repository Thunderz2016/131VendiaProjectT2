import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import LinkLayout from "./LinkLayout";
import { Divider } from "@chakra-ui/react";

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
