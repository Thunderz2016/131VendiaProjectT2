
import { useEffect, useState, Navigate } from "react";
import { Link} from "react-router-dom";
import {Button, IconButton,
   Flex, VStack, Spacer,
   Input, Text,  Image,  useColorModeValue, Avatar} from "@chakra-ui/react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

//import { Navigate } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  const [authUser, setAuthUser] = useState(null);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const bg = useColorModeValue('teal.100', 'teal.700')
  const txt=useColorModeValue('black','gray.300');
  const boxes=useColorModeValue('gray.500','white');
  
  const breakpoints = {
    base:"0px",
    sm: "600px",
    md: "920px",
    lg: "1180px",
    xl: "1300px",
    "2xl": "1800px",
  };

  return (
  
  <Flex 
    gap={2} 
    bg={bg} 
    py={2} 
    px={2} 
    boxShadow="md" 
    >

          {/* Logo and Title*/}
      <Image 
        boxSize={{base:"40px", sm:"50px", md:"60px", lg:"70px",xl:"80px", "2xl":"90px"}}
        mt={1}
        src="https://cdn.discordapp.com/attachments/1148697463578968249/1163916893355262003/logo.png?ex=65415113&is=652edc13&hm=7c41c0a8ffff4712a692a75d7083b74c936b9c0ec3054a8568d366b4c8a64d45&"
      />
      
      <Text 
        py={4} 
        fontSize={{base:"10px", sm:"17px", md:"25px", lg:"30px",xl:"35px", "2xl":"40px"}}
        style={{fontWeight: 'bold' }}>  
        Team Zephyr
      </Text>

      <Spacer/>
        
        {/*Profile Button*/}
    <Link to="/orgCreation">

      <IconButton
        isRound={true}
        top={{base:"5px", sm:"10px", md:"20px"}}
        type="submit"
        style={{justifyContent:"flex-end"}}   
        bg="transparent"
        size="sm"
      >  
        <Avatar 
        name='Team Zephyr'
        src='https://bit.ly/broken-link' 
        size={{base:"sm", md:"md"}}
        />
      </IconButton>

    </Link>

    {/* Sign out/Login button */}

   {authUser ? (
      <>
      
      <Link to="/" >
        <Button  
          top={{base:"5px", sm:"10px", md:"20px"}}
          colorScheme="red" 
          onClick={userSignOut}
          style={{justifyContent:"flex-end"}}    
        >
          <Text pl={{base:5, sm:1}}>
           Sign Out
          </Text>
        </Button>
      </Link>
        </>
      ) : (
        <Link to="/" >
          <Button 
            pr={5} 
            top={{base:"5px", sm:"10px", md:"20px"}}
            colorScheme="blue" 
            type="submit"
            style={{justifyContent:"flex-end"}}          
          >
            Log In
          </Button>
        </Link>
    )}

    {/* Search bar*/}
    <VStack justifyContent="flex-end" 
    h={{base:"40px", sm:"50px", md:"60px"}}
    w={{base:"90px", sm:"110px", md:"140px", lg:"160px",xl:"190px", "2xl":"210px"}}
    >
        <Input 
          isInvalid
          errorBorderColor={boxes}
          _placeholder={{color:txt}} 
          bg={-txt}
          type="text" 
          placeholder="Search" 
        />
    </VStack>

  </Flex>
  );
}


export default Layout;