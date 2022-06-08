
import { Box, Button, Container, Heading, Image, Text, Flex } from "@chakra-ui/react"
import { IoLogoWhatsapp } from 'react-icons/io';
import { GoVerified, GoUnverified } from 'react-icons/go'


interface CardProps {
    teacher:string;
    school?:string;
    email:string;
    mainText:string;
    imageUrl:string;
    price:string | Number;
    className?:string;
    isVerified:boolean;
    submitButtonClick:() => void;
}

export const Card = ({teacher, school, email, mainText, imageUrl, price, isVerified, className, submitButtonClick}: CardProps) => {

    
    return (
        <Container className={className}>
                <Box width="100%" backgroundColor="#1a1a1a" minHeight="300px" marginTop="30px" boxShadow="4px 4px 6px -3px rgba(130, 87, 229,0.14)" borderRadius="10px" >
                    <Container display="flex" alignItems="center" marginTop="20px" minHeight="80px" >
                        <Box marginTop="10px"><Image  src={imageUrl} borderRadius='full' boxSize='60px' width="85px" height="80px" /></Box>
                        <Box marginTop="20px" >
                            <Flex alignItems="center" >
                                <Heading as="h4" size="md" ml="10px" color="#fff">{teacher}</Heading>
                                {isVerified ? (<GoVerified title="Usuário verificado" color="#0cdc6a" style={{marginLeft:"12px"}} />) : (<GoUnverified title="Usuário não verificado" color="#dc0c5f" style={{marginLeft:"12px"}} />)}
                            </Flex>
                            <Text color="#d7d7d7" size="xs" ml="10px">{school}</Text>
                            <Text color="#d7d7d7" size="xs" ml="10px">{email}</Text>
                        </Box>
                    </Container>
                    <Container marginTop="20px" pr="30px" minHeight="100px">
                        <Box>
                            <Text color="#d7d7d7" textAlign="justify" size="xs" ml="10px">{mainText}</Text>
                        </Box>
                    </Container>
                    <Container display="flex" alignItems="center" marginTop="20px"  minHeight="100px" bgColor="#101010" border="2px #101010 solid" >
                        <Box  width="100%" display="flex" justifyContent="space-between" alignItems="center" >
                            <Box display="flex">
                                <Text color="#d7d7d7">Preço/Hora</Text>
                                <Heading  as="h6" size="md" ml="10px" color="#fff">{price}</Heading>
                            </Box>
                            <Button size="lg" _hover={{backgroundColor:"#20c96c"}} bgColor="#04D361" color="white"><IoLogoWhatsapp color="#dad8d8" size="26px" /> <Text marginLeft="10px" onClick={submitButtonClick}>Entrar em contato</Text></Button>
                        </Box>
                    </Container>

                </Box>
            </Container>
    )
}