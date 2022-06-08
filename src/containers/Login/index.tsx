import { Box, Button, Container, Flex, Heading, InputGroup, Spinner } from "@chakra-ui/react"
import { CustomContainer } from "../../components/Container"
import { Formik, FormikValues } from "formik"
import { initialValues, validationSchema } from "./utils"
import { CustomInput } from "../../components/Form/CustomInput"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { authApi } from "../../api/auth"
import { useStoreActions, useStoreState } from "../../store"
import { useHistory } from "react-router-dom"

interface User {
    accessToken: string;
    email:string;
    id: number | null; 
    roles: string[];
    username: string;
}


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formButtonLoading, setFormButtonLoading] = useState(false);
    const setUser = useStoreActions(state => state.addUser)
    const user = useStoreState(state => state.users)
    const history = useHistory();

    
    const onSubmit = (values: FormikValues) => {
      
        setFormButtonLoading(true)
        authApi.post({...values})
        .then( res => {
            console.log(res.data)
            const user: User = {
                id:res.data.id,
                username:res.data.username,
                accessToken:res.data.accessToken,
                roles:res.data.roles,
                email:res.data.email
            }
            
            setUser(user)
            localStorage.setItem('accessToken', user.accessToken)
            if(res.data.accessToken){
               return history.push("/aprovar-reprovar")
            }
        }).catch(err => {
            console.error(err)
            console.log(err,'err')
        }).finally(() => {
            setFormButtonLoading(false)
            console.log('user',user)
        })
    }
    
    
    
    return (
        <CustomContainer maxW="container.xl" display="flex" alignItems="center" justifyContent="center"  w="100%" h="100vh" >
            <Box width="60%" height="70vh" bgColor="#1a1a1a" borderRadius="2xl">
                <Flex justifyContent="center" color="#FFF" mt="20px">
                   <Heading as="h1" size='2xl' >Faça seu login</Heading> 
                </Flex>
                <Box mt="80px" >
                    <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    style={{backgroundColor:"blue"}}
                    onSubmit={onSubmit}
                    >
                        {({ handleSubmit, isValid, dirty }) => (
                            <form onSubmit={handleSubmit}>
                                <Container w="100%"   >
                                    <Box>
                                        <CustomInput name="username" label="Nome de usuário*" hasRightIcon={true} icon={<FaUserAlt fontSize="20px" color="blackAlpha.700" />}  />
                                    </Box>
                                    <Box mt="30px">
                                        <InputGroup>
                                            <CustomInput name="password" label="Senha*" type={!showPassword ? "password" : "text"} hasRightIconButton={true} onIconButtonClick={() => setShowPassword(!showPassword) } icon={!showPassword ? <AiFillEye color="#04D361" fontSize="24px" /> : <AiFillEyeInvisible color="#04D361" fontSize="24px" /> }  />
                                          
                                        </InputGroup>
                                    </Box>

                                    <Flex mt="30px" justifyContent="center">
                                        <Button
                                        type="submit"
                                         w="30%"
                                         disabled={!dirty || !isValid || formButtonLoading}
                                         height="50px"
                                         color="white" 
                                         bg="green.100"
                                         _hover={{ bg: "green.800" }}
                                         >
                                            {!formButtonLoading ? "Enviar" :  <Spinner color="#d7d7d7" />}
                                        </Button>
                                    </Flex>

                                </Container>

                            </form>
                        )}

                    </Formik>
                </Box>
            </Box>
        </CustomContainer>
    )
}