import { Box,Container } from "@chakra-ui/layout"
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import { ReactNode } from "react"

interface CustomContainerProps extends HTMLChakraProps<"div">, ThemingProps<"Container">  {
    bg?:string;
    maxW?:string;
    minHeight?:string;
    children:ReactNode;
}

export const CustomContainer = ({ bg = "gray.100",maxW, minHeight = "100vh",children,...props }:CustomContainerProps) => {
    return (
        <Box bg={bg} minHeight={minHeight}>
        <Container
        {...props} 
        maxW={maxW}
        >
        {children}
        </Container>
        </Box>
    )
    

 }