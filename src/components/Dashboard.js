import { Center, Flex, Heading, Link, Stack, Box } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: '250px',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
    borderRadius: 'lg', // Use "borderRadius" to control the curvature
    p:'4',
    borderWidth: '2px',// Adjust padding as needed
    borderColor: 'blue',
    width: '400px',
    height: "300px",
  }

  return ( <Center height="100vh">
    <Stack align="center">
        <Flex flexWrap='wrap' gap='24px' justifyContent='space-evenly'>
            {/* Box 1 */}
            <Box sx={basicBoxStyles} filter='grayscale(5%)' 
            direction="column" justify="space-between" height="100%">
            <Link
            maxW="400px"
            p="70"
            color="red" href="#" as={RouterLink} to="/DeviceOne">
            DeviceOne
            </Link>
            </Box>

            {/* Box 2 */}
            <Box sx={basicBoxStyles} filter='grayscale(5%)'>
            <Link maxW="400px"
            p="70"
            color="orange" href="#" as={RouterLink} to="/DeviceTwo">
            DeviceTwo
            </Link>
            </Box>

            {/* Box 3 */}
            <Box sx={basicBoxStyles} filter='grayscale(5%)'>
            <Link maxW="400px"
            p="70"
            color="blue" href="#" as={RouterLink} to="/DeviceThree">
            DeviceThree
            </Link>
            </Box>

            {/* Box 4 */}
            <Box sx={basicBoxStyles} filter='grayscale(5%)'>
            <Link maxW="400px"
            p="70"
            color="green" href="#" as={RouterLink} to="/DeviceFour">
            DeviceFour
            </Link>
            </Box>
        </Flex>
    
    </Stack>

</Center>
          
        )
      }

  export default Dashboard;