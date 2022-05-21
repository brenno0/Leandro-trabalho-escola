import { Box,Container, Flex, Heading,Text } from "@chakra-ui/react";
import {  HTMLChakraProps } from "@chakra-ui/system";

interface HeaderProps extends HTMLChakraProps<"div"> {
    textTitle:string;
    text?:string;
}
// Só será possível a edição de visual da Box do componente, todo o resto manterá o seu padrão

export const Header = ({textTitle,text, ...props}: HeaderProps) => {
    return (
        <Box w="100%" h="272px" bg="#000" {...props}>
            <Container h="100%" maxW="container.xl" >
                <Flex h="100%" direction="column" justify="left">
                    <Heading mt="60px" maxW="400px" color="white" >{textTitle}</Heading>
                    <Text mt="10px" fontSize="lg" maxW="300px" color="indigo.50">{text}</Text>
                </Flex>
            </Container>
        </Box>

    );
}   