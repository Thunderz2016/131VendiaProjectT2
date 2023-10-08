import React, { useState } from 'react';
import {
  Center,
  Stack,
  Box,
  Input,
  Button,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
//import { CloseIcon } from '@chakra-ui/icons';
//import { useNavigate } from 'react-router-dom';

function DynamicList() {
  const [textList, setTextList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAddingText, setIsAddingText] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddText = () => {
    if (inputText.trim() !== '') {
      setTextList([...textList, inputText]);
      setInputText('');
      setIsAddingText(true); // Show the list when adding text
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxSize: '250px',
            fontWeight: 'bold',
            fontSize: '20px',
            px: 4,
            borderRadius: 'lg',
            p: '4',
            borderWidth: '2px',
            borderColor: 'blue',
            width: '400px',
            height: '300px',
          }}
        >
          <Text fontSize="xl">Add Device</Text>
          <Input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text"
            mb={2}
          />
          <Button onClick={handleAddText}>Add Text</Button>

          <Collapse in={isAddingText} animateOpacity>
            <ul>
              {textList.map((text, index) => (
                <li key={index}>
                  <RouterLink to="/device">
                    <Text color="blue.500" textDecoration="underline">
                      {text}
                    </Text>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </Collapse>
        </Box>
      </Stack>
    </Center>
  );
}

export default DynamicList;
