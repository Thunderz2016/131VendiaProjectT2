import {  Flex, Button,  HStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { StarIcon, AddIcon, EditIcon, DeleteIcon, CalendarIcon  } from '@chakra-ui/icons';


const LinkLayout = () => {

    const bg = useColorModeValue('teal.100', 'teal.700')
    const breakpoints = {
      base:"0px",
      sm: "480px",
      md: "720px",
      lg: "1080px",
      xl: "1200px",
      "2xl": "1800px",
    };

    return (
        <Flex
          py="3"
          pr="3"
          pl="3"
          align="center"
          justify="space-between"
          boxShadow="md" 
          bg={bg}
          wrap="wrap"
        >

        {/*Home page */}
        <HStack as="nav" spacing="2">
            <Link to="/Homepage">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <StarIcon paddingRight={1}/>
                    Home Page  
            </Button>
            </Link>            
        </HStack>

        {/*add device */}
        <HStack as="nav" spacing="5">
            <Link to="/Device">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <AddIcon paddingRight={1}/>
                  Device Add 
            </Button>
            </Link>            
        </HStack>

        <HStack as="nav" spacing="5">
            <Link to="/AgGridTable">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <CalendarIcon paddingRight={1}/>
                List/Update
            </Button>
            </Link>            
        </HStack>

 {/*           update device 
        <HStack as="nav" spacing="5">
            <Link to="/DeviceUpdate">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <EditIcon paddingRight={1}/>
                  Device Update
            </Button>
            </Link>            
        </HStack>
*/}
        {/*delete device */}
        <HStack as="nav" spacing="5">
            <Link to="/DeleteDevice">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <DeleteIcon paddingRight={1}/>
                  Delete
            </Button>
            </Link>            
        </HStack>
        

 {/*           list device page 
        <HStack as="nav" spacing="5">
            <Link to="/ListDevice">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <CalendarIcon paddingRight={1}/>
                  List Page
            </Button>
            </Link>            
        </HStack>
*/}
{/*
        <HStack as="nav" spacing="5">
            <Link to="/ListID">
            <Button 
                bg="transparent"
                size={{base:"5px", sm:"10px", md:"20px", lg:"30px", xl:"40px", "2xl":"50px"}}
                > 
                <CalendarIcon paddingRight={1}/>
                  Org List
            </Button>
            </Link>            
        </HStack>
*/}

        </Flex>
    );
};

export default LinkLayout; 