import { Flex,Text,Image, Button, Grid, Link } from '@chakra-ui/react';
import  HomeImage  from "../../common/assets/HomeImage.svg"
import { CustomContainer } from '../../components/Container';
import { CustomBookIcon, CustomClassIcon } from './Home';
import { FiLogIn } from 'react-icons/fi'

function Home() {
  return (
    <CustomContainer maxW="container.xl" bg="#000">
      <Link color="#d7d7d7" _hover={{color:"#b7b7b7"}} style={{ textDecoration: 'none' }} href="/login"  position="absolute" right="20%"  top="60px">
        <Flex alignItems="center" gap="10px">
          <FiLogIn fontSize="22px" />
          <Text  fontWeight="bold" textAlign="right" >
            Logar-se como Administrador
          </Text>
        </Flex>
      </Link>
      <Flex 
      h="80vh"
      align="center"
      justify="left"
      >
      
        <Flex  maxW="40%" wrap="wrap" mb="100px" >
          <Text fontSize="70px" color="white" fontWeight="bold">Virtual estudo</Text>
          <Text fontSize="40px" maxW="400px" color="#d7d7d7">Sua plataforma de estudos online.</Text>
        </Flex> 
       
        <Flex ml="20px" mt="60px" >
          <Image src={HomeImage} />
        </Flex>
       
      </Flex>
      
      <Grid templateColumns="repeat(2, 1fr)" gap="20px" display="flex" justifyContent="left">
        <Link  style={{ textDecoration: 'none' }} href="/procurar-aulas" width="25%" >
            <Button
            leftIcon={<CustomBookIcon  />}
            width="100%" 
            h="104px" 
            color="white" 
            bg="indigo.200"
            _hover={{ bg: "indigo.400" }}
            >
              <Text fontSize="2xl" color="white">Estudar</Text>
            </Button>
          </Link>
          <Link  style={{ textDecoration: 'none' }} href="/cadastrar-aulas" width="25%">
            <Button 
            leftIcon={<CustomClassIcon />}
            width="100%" 
            h="104px" 
            color="white" 
            bg="green.100"
            _hover={{ bg: "green.800" }}
            >
            <Text fontSize="2xl" color="white">Dar aulas</Text>
            </Button>
          </Link>
          
        </Grid>
    </CustomContainer>

  );
}

export default Home; 
