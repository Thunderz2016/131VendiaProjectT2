import { Box, SimpleGrid, Grid, Text} from '@chakra-ui/react';


//npm install -g json-server

export default function Dashboard(){

return(
    <Grid>
<SimpleGrid p="10px" columns={4} spacing={10} minChildWidth="250px">
    <Box bg="white" h="200px" border="1px solid">
    <Text color ={{base: 'pink', md:'blue',lg:'green'}}>test</Text>

    </Box>

    <Box bg="white" h="200px" border="1px solid"></Box>
    <Box bg="white" h="200px" border="1px solid"></Box>
    <Box bg="white" h="200px" border="1px solid"></Box>
</SimpleGrid>

</Grid>
)
}

