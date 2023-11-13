import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { Spacer } from "@chakra-ui/react";

export default function NavbarLayout () {
    return (
        <div>
            <Layout />
            <Spacer/>
            <Outlet  />
        </div>
    )
}