import { Flex,Text,Image, Button, Grid, Link } from '@chakra-ui/react';
import  HomeImage  from "../../common/assets/HomeImage.svg"
import { CustomContainer } from '../../components/Container';
import { CustomBookIcon, CustomClassIcon } from './Home';

function Home() {
  return (
    <CustomContainer maxW="container.xl" bg="#000">
      <Flex 
      h="100vh"
      align="center"
      justify="left"
      wrap="wrap"
      >
        <Flex  maxW="40%" wrap="wrap" mb="100px">
          <Text fontSize="70px" color="white" fontWeight="bold">Virtual estudo</Text>
          <Text fontSize="40px" maxW="400px" color="indigo.50">Sua plataforma de estudos online.</Text>
        </Flex> 
        <Flex ml="20px" mt="60px">
          <Image src={HomeImage} />
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" gap="20px" mb="100px">
        <Link  style={{ textDecoration: 'none' }} href="/procurar-aulas">
            <Button
            leftIcon={<CustomBookIcon  />}
            width="282px" 
            h="104px" color="white" 
            bg="indigo.200"
            _hover={{ bg: "indigo.400" }}
            >
              <Text fontSize="2xl" color="white">Estudar</Text>
            </Button>
          </Link>
          <Link  style={{ textDecoration: 'none' }} href="/cadastrar-aulas">
            <Button 
            leftIcon={<CustomClassIcon />}
            width="282px" 
            h="104px" color="white" 
            bg="green.100"
            _hover={{ bg: "green.800" }}
            >
            <Text fontSize="2xl" color="white">Dar aulas</Text>
            </Button>
          </Link>
          
        </Grid>
      </Flex>
    </CustomContainer>

  );
}

export default Home; 
