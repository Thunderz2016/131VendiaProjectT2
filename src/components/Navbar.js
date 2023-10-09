import { SettingsIcon } from '@chakra-ui/icons';
import {Flex,Heading, Text, Spacer, Button, HStack, List, ListIcon } from '@chakra-ui/react';


export default function Navbar() {
  return (
    /*Flex is saying how the objects (in this case heading and box) will change itself in size to fit the entire screen as well as what it's assigned as when in HTML

    */
    <Flex as="nav" p="10px" alignItems="center" gap="10px">

        <Heading as="h1" alignItems="center">Test</Heading>
        <Spacer/>

        <List>

        <HStack spacing="10px">

        <Text>test@email.com</Text>

        <a href="/Account">
            <Button bg="gray.200 ">
              <ListIcon as={SettingsIcon}/>
              </Button>
        </a>



        <a href="/">
            <Button bg="gray.200 ">Logout</Button>
        </a>

        </HStack>
        </List>

    </Flex>
  )
}
