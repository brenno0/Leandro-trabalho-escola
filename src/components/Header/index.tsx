import { Box,Container, Flex, Heading,IconButton,Text } from "@chakra-ui/react";
import {  HTMLChakraProps } from "@chakra-ui/system";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from "react-router-dom";
interface HeaderProps extends HTMLChakraProps<"div"> {
    textTitle:string;
    text?:string;
}
// Só será possível a edição de visual da Box do componente, todo o resto manterá o seu padrão

export const Header = ({textTitle,text, ...props}: HeaderProps) => {
    const history = useHistory()
    
    return (
        <Box w="100%" h="272px" bg="#000" {...props}>
            
            <Container h="100%" maxW="container.xl" >
                <IconButton
                marginTop="20px"
                variant='outline'
                colorScheme='white'
                aria-label='Call Sage'
                fontSize='36px'
                onClick={() => history.push("/")}
                icon={<ArrowBackIcon  color="#FFF" />}
                />
                <Flex h="100%" direction="column" justify="left">
                    <Heading mt="15px" maxW="400px" color="white" >{textTitle}</Heading>
                    <Text mt="10px" fontSize="lg" maxW="300px" color="#d7d7d7">{text}</Text>
                </Flex>
            </Container>
        </Box>

    );
}   