import { TabList, TabPanels, Tab, Tabs } from "@chakra-ui/react";

export default function Account() {
    return (
        <Tabs>
            <TabList mt="40px" p="20px" colorScheme="purple">
                <Tab _selected={{color:'white', bg: 'blue.900'}}>Account Info</Tab>
                <Tab>Action History</Tab>
            </TabList>
            
            <TabPanels>

            </TabPanels>
            
        </Tabs>
    )
}
