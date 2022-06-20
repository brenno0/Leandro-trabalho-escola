
import { Box, Button, Container, Heading, Image, Text, Flex, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react";
import { GoVerified, GoUnverified } from 'react-icons/go'
import { Rate } from "../Rate";


interface CardProps {
    teacher:string;
    school?:string;
    email:string;
    mainText:string;
    imageUrl:string;
    price:string | Number;
    containerClassName?:string;
    isVerified:boolean;
    contact:string;
    cpf:string;
    onApprove:() => void;
    onDisapprove:() => void;
    onVerify:() => void;
    stars:Number;
    starNumbersFunction:Function;
}

export const ApprovalCard = ({teacher, school, contact, cpf, email, mainText, imageUrl, price, isVerified, onApprove, onDisapprove,  onVerify, stars = 0, starNumbersFunction}: CardProps) => {
    
    const [rating, setRating] = useState(stars)
    
    return (
                <Box width="100%" backgroundColor="#1a1a1a" minHeight="300px" marginTop="30px" boxShadow="4px 4px 6px -3px rgba(130, 87, 229,0.14)" borderRadius="10px" >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Container maxW='5xl' display="flex" alignItems="center" marginTop="20px" minHeight="80px" >
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
                        <Box mr="40px">
                            <Rate 
                            rating={rating} 
                            onRating={
                                (rate: any) => {
                                    setRating(rate)
                                    starNumbersFunction(rate)
                                }
                            } 
                            stars={stars}/>
                        </Box>

                    </Flex>


                    <Container maxW='5xl' marginTop="20px" pr="30px" minHeight="100px">
                        <Box>
                            <Text color="#d7d7d7" textAlign="justify" size="xs" ml="10px">{mainText}</Text>
                        </Box>
                    </Container>
                    <Container maxW="5xl" mt="20px">
                        <Box  width="100%" display="flex" justifyContent="space-between" alignItems="center" >
                            <Box display="flex">
                                <Heading  as="h6" size="md" ml="10px" color="#fff">CPF: &nbsp;</Heading>
                                <Text color="#d7d7d7">{cpf}</Text>
                            </Box>
                            <Box display="flex">
                                <Heading  as="h6" size="md" ml="10px" color="#fff">Telefone: &nbsp;</Heading>
                                <Text color="#d7d7d7">{contact}</Text>
                            </Box>
                                
                        </Box>
                    </Container>


                    <Container maxW='5xl' display="flex" alignItems="center" marginTop="20px"  minHeight="100px" bgColor="#101010" border="2px #101010 solid" >
                        <Box  width="100%" display="flex" justifyContent="space-between" alignItems="center" >
                            <Box display="flex">
                                <Text color="#d7d7d7">Preço/Hora</Text>
                                <Heading  as="h6" size="md" ml="10px" color="#fff">{price}</Heading>
                            </Box>
                            <ButtonGroup variant='outline' >
                                <Button  onClick={onApprove} size="lg" _hover={{backgroundColor:"#08bf5ac9"}} bgColor="#08bf5a" color="white">Aprovar</Button>
                                <Button  size="lg" _hover={{backgroundColor:"#d7272794"}} bgColor="#ff4c4cb9" color="white" onClick={onDisapprove}>Reprovar</Button>
                                <Button  size="lg" _hover={{backgroundColor:"#257271"}} bgColor="#319795"color="white" onClick={onVerify}>{isVerified ? "Remover verificação" : "Verificar" }</Button>
                            </ButtonGroup>
                        </Box>
                    </Container>

                </Box>
    )
}