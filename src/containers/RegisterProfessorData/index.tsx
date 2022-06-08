import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Flex, FormControl, Heading, Stack,Text,Button, Spinner, IconButton, useToast } from "@chakra-ui/react"
import InputMask from 'react-input-mask';
import { Formik } from "formik"
import { CustomContainer } from "../../components/Container"
import { Header } from "../../components/Header"
import { CustomInput } from '../../components/Form/CustomInput'
import { CustomTextarea } from '../../components/Form/TextArea'
import { CustomSelect } from '../../components/Form/Select'
import { initialValues,validationSchema, days } from "./utils"
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { mattersApi } from '../../api/mattersApi'
import { teacherApi } from '../../api/teacherApi';
import { useHistory } from 'react-router-dom';

interface MattersInterface{
    label:String;
    value:Number;
}


export const RegisterProfessorData = () => {

    const toast = useToast()
    const history = useHistory()


    
    const [matters, setMatters] = useState<MattersInterface[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

   
    const getData = useCallback(async () => {
        setIsLoading(true)
        await mattersApi.list()
        .then((response) => {
           response.data.matterInput = response.data.map((matter:any) => {
               return {
                   value:matter.id,
                   label:matter.discipline
               }
           })
            setMatters(response.data.matterInput)
        }).catch((err) =>{
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    const submitTeacherData = async (values:any) => {
        setIsLoading(true)
            const body = {
                "cpfOrCnpj": values.cpf,
                "description": values.biography,
                "disciplines": [
                  {
                    "discipline": values.matterName
                  }
                ],
                "email": values.email,
                "fullName": values.name,
                "linkPhoto" : values.photo,
                "hourCost": values.hourCost,
                "schedules": values.schoolSchedule,
                "whatsApp": values.contact
              
              }
            await teacherApi.post(body)
            .then(res => {
                toast({
                    position: 'bottom-right',
                    title: 'Aula registrada com sucesso!',
                    description: "Sua aula foi criada com sucesso, agora é só aguardar os alunos em seu Whatsapp!",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                history.push("/")
            }).catch((error) => {
                toast({
                    position: 'bottom-right',
                    title: "´CPF já cadastrado",
                    description: "´CPF já cadastrado",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }).finally(() => {
                setIsLoading(false)
            })
    
    }

    return (
        
        <>
        <Header
        textTitle="Que incrível que você quer dar aulas"
        text="O primeiro passo é preencher este formulário de inscrição"
        />
        <CustomContainer  bg="gray.100" minHeight="200vh" maxW="container.xl">
            <Box background="white" w="60%" pos="absolute" top="230px">
                    <Container maxW="80%">
                        <Heading color="gray.900" my="40px" fontSize="2xl">Seus dados</Heading>
                        <Box h="1px" my="20px"></Box>
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitTeacherData}
                        >

                            {({dirty,isValid,setFieldValue,values,isSubmitting}) => (
                                <>
                            <Stack spacing={2}>
                            <CustomInput name="name" label="Nome completo" value={values.name}  onChange={(e) => setFieldValue("name",e.target.value)} />

                            <CustomInput name="email" label="Email" value={values.email}  onChange={(e) => setFieldValue("email",e.target.value)} />

                            <CustomInput  as={InputMask} maskChar="" mask="999.999.999-99" name="cpf" label="CPF" value={values.cpf}  onChange={(e) => setFieldValue("cpf",e.target.value)} />

                            <CustomInput  as={InputMask} maskChar="" mask="(99) 9 9999-9999" name="contact" label="Whatsapp" value={values.contact}  onChange={(e) => setFieldValue("contact",e.target.value)}   />

                            <CustomInput name="photo" label="Link da sua foto" value={values.photo}  onChange={(e) => setFieldValue("photo",e.target.value)}   />
                            
                            <CustomTextarea minH="200px" name="biography" label="Biografia" value={values.biography} onChange={(e) => setFieldValue("biography",e.target.value)} />
                            
                        </Stack>

                            <Heading  color="gray.900" my="40px" fontSize="2xl">Sobre a aula</Heading>
                            <Box h="1px" bgColor="gray.100" w="100%" my="20px"  ></Box>

                            <Stack spacing={2}>

                           <CustomSelect name="matterName" label="Matéria" isLoading={isLoading} option={matters} onChange={(e) => {
                               let matter = matters?.find(matter => matter.label === e.target.value)
                               
                               setFieldValue("matter", matter)
                               setFieldValue("matterName", matter?.label)
                           }}
                           />

                                   
                            <CustomInput name="hourCost" as={InputMask} maskChar="" mask="R$ ****,**" label="Custo da sua hora por aula em R$" />
                        </Stack>

                            <Flex justify="space-between" alignItems="center">
                                <Heading  color="gray.900" my="40px" fontSize="2xl">Horários disponíveis</Heading>
                                
                                <Button leftIcon={<AddIcon />} colorScheme='teal' variant='ghost' onClick={() => {
                                values.schoolSchedule.push({dayWeek:"",initialDate:"",finalDate:""});
                                setFieldValue("schoolSchedule", values.schoolSchedule);
                            }}>
                                    Novo Horário
                                </Button>
                            </Flex>
                            <Box h="1px" bgColor="gray.100" w="600px" my="20px"  ></Box>

                            <Stack spacing={2}>
                         
                           {values.schoolSchedule.map((item, index) => (
                                <Flex key={`item - ${index}`}>
                                    <CustomSelect  name="dayWeek" label="Dia da semana" option={days} maxW="90%"  onChange={(e) => {setFieldValue(`schoolSchedule[${index}].dayWeek`, e.target.value)}} />


                            
                                    <FormControl mx="5px" w="20%" >
                                        <CustomInput name="initialDate" as={InputMask} maskChar="" mask=" 99:99" label="Das"  onChange={(e) => {setFieldValue(`schoolSchedule[${index}].initialDate`, e.target.value)}}/>
                                    </FormControl> 

                                    <FormControl mx="5px" w="20%">
                                        <CustomInput name="finalDate" as={InputMask} maskChar="" mask=" 99:99" label="Até" onChange={e => {setFieldValue(`schoolSchedule[${index}].finalDate`, e.target.value)}} />
                                    </FormControl>
                                    {(values.schoolSchedule.length > 1 && index > 0) &&
                                        <FormControl maxW="5%" my="35px">

                                        <IconButton
                                        icon={<CloseIcon />}
                                        size="sm"
                                        variant="ghost"
                                        colorScheme='purple'
                                        onClick={() => {
                                            values.schoolSchedule.splice(index, 1);
                                            setFieldValue("schoolSchedule", values.schoolSchedule);
                                        }} 
                                        aria-label="Clear Icon"                                        
                                        />
                                        </FormControl>

                                    }
                                </Flex>
                           ))} 
  
                            </Stack>
                            <Box h="150px" bgColor="gray.50">
                               <Flex h="100%" align="center" justify="space-between">
                                  <Text mx="10" color="gray.200">Preencha todos os campos!</Text>
                                  <Button type="submit" disabled={!isValid || !dirty || isLoading} onClick={() => submitTeacherData(values)}  color="white" mx="20px" w="250px" h="56px" bgColor="green.100" _hover={{ bg: "green.800" }}>{(isSubmitting || isLoading) ? <Spinner color="#d7d7d7" /> : "Enviar"}</Button>
                               </Flex>
                            </Box>
                                </>
                            )}

                        </Formik>
                        
                    </Container>

                   
            </Box>

        </CustomContainer>
        </>
    )
}