import React, { useState, useEffect } from 'react';
import {
  Center,
  Stack,
  Box,
  Input,
  Button,
  Text,
  Wrap,
  WrapItem,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

function DynamicList() {
  const [textList, setTextList] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // When the component mounts, try to load the text list from local storage
    const storedTextList = localStorage.getItem('textList');
    if (storedTextList) {
      setTextList(JSON.parse(storedTextList));
    }
  }, []);

  useEffect(() => {
    // Whenever the textList changes, save it to local storage
    localStorage.setItem('textList', JSON.stringify(textList));
  }, [textList]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddText = () => {
    if (inputText.trim() !== '') {
      setTextList([...textList, inputText]);
      setInputText('');
    }
  };

  const handleDeleteText = (index) => {
    const updatedTextList = [...textList];
    updatedTextList.splice(index, 1);
    setTextList(updatedTextList);
  };

  return (
    <Center height="100vh">
      <Stack align="center">

        <Text fontSize="xl">Add Device</Text>

        {/* Input field for naming devices */}
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text"
          mb={2}
          width='auto'
        />
        <Button onClick={handleAddText}>Add Text</Button>

        {/* This is the device list created */}
        <Box>

          <Wrap spacing='30px'>
            {textList.map((text, index) => (
              <WrapItem key={index}>
                <Center w='180px' h='80px' bg='red.200'>
                  <RouterLink to={`/device?text=${text}`}>
                    <Text color="blue.500" textDecoration="underline" >
                      {text}
                    </Text>
                  </RouterLink>
                  <IconButton
                    icon={<CloseIcon />}
                    size="xs"
                    onClick={() => handleDeleteText(index)}
                    colorScheme="red"
                    //ml={20}
                    mb={12}
                  
                  />
                </Center>
              </WrapItem>
            ))}
          </Wrap>

        </Box>
      </Stack>
    </Center>
  );
}

export default DynamicList;
