import { Outlet } from "react-router-dom"
import { Grid,GridItem, List, ListIcon, Collapse, Button} from "@chakra-ui/react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { CalendarIcon } from "@chakra-ui/icons"
import React from 'react'

export default function RootLayout() {

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);


  return (

    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
    <div>
    <Button bg="blue.400" onClick={handleToggle} mt="1rem">
      <List>
        <ListIcon as={CalendarIcon}/>   
      </List> 
    </Button>
    <Collapse mt={4} isOpen={show}>
      <Sidebar />
    </Collapse>  
    </div>


      <GridItem
        as="main"
        colSpan={{base: 4, lg:4, xl:5}}
        p="40px"
      >
        <Navbar />
        
        <Outlet />
      </GridItem>
    </Grid>
  )
}

/*

      <GridItem
        as="aside"
        colSpan={{base: 2, lg:2, xl:1}}
        bg="blue.900"
        minHeight={{lg:'100vh'}}
        p={{base: '20px', lg:'30px'}}
      >
        <span margin='50px' style={{color:'white',  fontSize: 20, fontWeight:'bold', textDecoration:"underline"}}>
        Sidebar
        </span>


      </GridItem>

*/