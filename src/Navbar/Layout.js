
import { useEffect, useState, Navigate } from "react";
import { Link} from "react-router-dom";
import {IconButton, Text,  Image, Avatar,
   Show, Hide,
   Flex, HStack, Spacer, Divider,
   MenuItem, Menu, MenuList,MenuButton,MenuGroup,
   Tab, TabList, Tabs, 
   useColorModeValue, Input } from "@chakra-ui/react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { StarIcon, AddIcon,CalendarIcon,DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";

const Layout = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set the user object when the authentication state changes
    });
  }, []);

  const [authUser, setAuthUser] = useState(0);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const bg = useColorModeValue('teal.400', 'teal.700')
  const txt=useColorModeValue('black','gray.300');
  const boxes=useColorModeValue('gray.500','white');

  const breakpoints = {
    base:"0px",
    sm: "500px",
    md: "800px",
    lg: "1280px",
    xl: "1440px",
  };

  return (
    <Flex 
    bg={bg} 
    py={1} 
    px={2} 
    boxShadow="md" 
    >
    {/*Logo and Team name */}
      <Image 
        boxSize={{base:"30px", sm:"35px", md:"40px", lg:"45px",xl:"50px",}}
        src="https://cdn.discordapp.com/attachments/1148697463578968249/1163916893355262003/logo.png?ex=65415113&is=652edc13&hm=7c41c0a8ffff4712a692a75d7083b74c936b9c0ec3054a8568d366b4c8a64d45&"
      />

      <Text 
        fontSize="15px"
        marginY={{base:1, sm:2,lg:3}}
        style={{fontWeight: 'bold' }}>  
          Team Zephyr
      </Text> 

<Spacer/>
{/*navigation bar full full screen*/}
    <Show above='md'>    
    <Hide below='md'>
    <Tabs  mx={3} variant="enclosed">
        <TabList>

            <Tab>
            <Link to="/Homepage">
              <StarIcon paddingRight={1} />
              Home Page
              </Link>
            </Tab>
{/*
          <Tab>
            <AddIcon paddingRight={1} />
            <Link to="/Device">
              <Text  numberOfLines={1} style= {{flex: 1}}>
                Add Device
              </Text>
            </Link>
          </Tab>
*/}
          <Tab>
            <CalendarIcon paddingRight={1} />
            <Link to="/AgGridTable">AgGridTable</Link>
          </Tab>

          <Tab>
            <DeleteIcon paddingRight={1} />
            <Link to="/DeleteDevice">Delete</Link>
          </Tab>

        </TabList>
         
      </Tabs>
      </Hide>  
      </Show>      

    <Spacer/>

  {/* Search bar
      <HStack  
      w='80px'
      mr={2}
      >
          <Input 
            isInvalid
            errorBorderColor={boxes}
            _placeholder={{color:txt}} 
            bg={-txt}
            type="text" 
            placeholder="Search" 
          />
      </HStack>
  */}

 {/*Profile Button*/}
 <Menu >
  <MenuButton as={IconButton}
    isRound={true}
    type="submit"
    style={{justifyContent:"flex-end"}}   
    bg="transparent"
    size="sm"
    mr={{md:2, lg:3, xl:4}}
    mt={{base:1, md:2}}
  >  
    <Avatar 
    name='Team Zephyr'
    src='https://bit.ly/broken-link' 
    size='sm'
    />
  </MenuButton>
  <MenuList>

  <MenuGroup title={`${authUser.email}`}>
    <MenuItem as='a' href='/profile'>
        Profile
      </MenuItem>
    </MenuGroup>

    <MenuGroup title='Organization'>
      <MenuItem as='a' href='/orgCreation'>
        Organization creation
      </MenuItem>
    </MenuGroup>  

  <Divider orientation='horizontal' />
  {/* Sign out/Login button */}
      {authUser ? (
         <>
          <MenuItem 
          as='a' 
          href='/' 
          onClick={userSignOut}
          style={{fontWeight: 'bold', color:'red' }}
          >
           Sign out
          </MenuItem>
           </>
         ) : (

          <MenuItem 
          as='a' 
          href='/' 
          style={{fontWeight: 'bold', color:'blue' }}
          >
            Log In
          </MenuItem>


       )}

  </MenuList>

</Menu>

{/*Navigation bar as menu */}
    <Hide above='800px'>
    <Menu>
      <MenuButton 
        as={IconButton} 
        icon={<HamburgerIcon/>}
        bg="transparent"
        /> 

      <MenuList>
        <MenuItem icon={<StarIcon />} as='a' href='/Homepage'>
          Home Page
        </MenuItem>
{/*
        <MenuItem icon={<AddIcon />} as='a' href='/Device'>
          Device Add
        </MenuItem>
*/}

        <MenuItem icon={<CalendarIcon />} as='a' href='/AgGridTable'>
          List/Update
        </MenuItem>

        <MenuItem icon={<DeleteIcon />} as='a' href='/DeleteDevice'>
          Delete
        </MenuItem>
        
      </MenuList>
    </Menu>
    </Hide> 

    </Flex>
  );
}


export default Layout;