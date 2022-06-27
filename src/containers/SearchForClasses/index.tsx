import { useCallback, useEffect, useState } from "react";
import { teacherApi } from "../../api/teacherApi";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import './style.css';
import { Button, CircularProgress, Flex, Input, InputGroup, InputRightElement, useToast, Text } from '@chakra-ui/react'
import { CustomModal } from "../../components/Dialog";
import { FiCopy } from 'react-icons/fi'
import { BsCheck2 } from 'react-icons/bs'
import { errorMessages } from "../../common/utils/errorMessages";
import { days } from "../../common/utils/weekDays";
import { CustomSelect } from "../../components/Form/Select";
import { mattersApi } from "../../api/mattersApi";
import { Formik, FormikValues } from 'formik'
import { BiSad } from "react-icons/bi";

interface inputListObject {
    label:string;
    value:number;
}
interface filtersList {
    discipline:string;
    dayWeek:string;
}

interface schoolSubjects{
    id:Number;
    discipline:string;
    flagStandard?:Number;
    teachers?:unknown;
}

interface schoolSchedules {
    dayWeek:string;
    initialDate:string;
    finalDate:string;
    id:Number;
}

interface TeachersArray {
    approved:Number;
    verify:Number;
    id:Number;
    cpfOrCnpj:string;
    description:string;
    discipline:Array<schoolSubjects>;
    email:string;
    schedules:schoolSchedules[];
    fullName:string;
    hourCost:string;
    linkPhoto:string;
    whatsApp:string;
    stars:Number;
}

export const SearchForClasses = () => {
    const [teachers, setTeachers] = useState<TeachersArray[]>([])
    const [loading,setLoading] = useState(false)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isCheckIconVisible,setIsCheckIconVisible] = useState(false)
    const [teachersContact, setTeachersContact] = useState("")
    const [teachersContactNumbers,setTeachersContactNumber] = useState("")
    const [mattersList, setMattersList] = useState<inputListObject[]>([])
    const [filters, setFilters] = useState<filtersList>()
    const toast = useToast()


    const getData = useCallback(() => {
         setLoading(true)

        teacherApi.list(filters ? {params: {discipline:filters?.discipline?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""), dayWeek:filters?.dayWeek?.normalize('NFD').replace(/[\u0300-\u036f]/g, "") } } : '')
        .then((res) => {
            setTeachers(res.data)
        }).catch((err) => {
            toast({
                description: `${errorMessages.catch_error(err)}`,
                status: `error`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        }).finally(() => {
            setLoading(false)
        })
    },[toast, filters])
    
    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        Promise.all([
            mattersApi.list()

        ])
        .then((res) => {
            console.log(res[0])
            res[0].data.matterInput = res[0].data.map((i:any) => {
                return {
                    value:i.id,
                    label:i.discipline
                }
            })
            setMattersList(res[0].data.matterInput)
        }).catch(err => {
            toast({
                description: `${errorMessages.catch_error(err)}`,
                status: `error`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        })
        
    },[toast])

    const submitButtonClick = useCallback((index:number) => {
        setTeachersContact(teachers[index].whatsApp)
        setTeachersContactNumber(teachers[index].whatsApp.replace(/[^\d]+/g,''))
        setIsModalOpen(true)
    }, [teachers])

    const RenderModalContent = () => {
        return (
            <InputGroup size='md'>
                <Input
                pr='4.5rem'
                value={teachersContact}
                placeholder='Contato'
                />
                <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm'  _hover={{backgroundColor:"teal.400"}} bgColor={!isCheckIconVisible ? "teal.300" : "#00ea69"} color="white" onClick={async () => {
                    await navigator.clipboard.writeText(teachersContact)
                    setIsCheckIconVisible(true)
                    setTimeout(() => {
                        setIsCheckIconVisible(false)
                    }, 2000)
                    toast({
                        position: 'bottom-right',
                        title: "Contato copiado com sucesso!",
                        description: "Contato do professor copiado com sucesso! Agora é só entrar em contato com o seu professor e fazer uma oferta!",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
                    //   setIsModalOpen(false)
                   
                }}>
                    {!isCheckIconVisible ? (<FiCopy />) : (<BsCheck2/>)}
                </Button>
                </InputRightElement>
            </InputGroup>
        )
    }

    const onFilterSubmit = (values:FormikValues) => {
        console.log(values)
        setFilters({
            dayWeek:values.weekday.label,
            discipline:values.matter.label,
        })
    }

    
    
    return (
        <>

            <Header
            textTitle="Estes são os professores disponíveis"
            text="Basta filtrar por matérias e escolher seu professor!"
            />
                <Formik
                initialValues={{
                    matter:{
                        label:"",
                        value:null,
                    },
                    weekday:{
                        label:"",
                        value:null
                    }

                }}
                onSubmit={onFilterSubmit}
                
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Flex width="100%" justifyContent="center" >

                                <InputGroup maxW="50%"  size='md' display="flex" justifyContent="center" gap="8px" alignItems="flex-start" position="relative" top="-30px">
                                    <CustomSelect bgColor="#3c3c3c" color="white" name="matter" position="relative" top="-8px"  h="50px" option={mattersList} value={values.matter.label}  onChange={(e) => {
                                        let matter = mattersList?.find(matter => matter.label === e.target.value)
                                        setFieldValue('matter', matter)

                                    }}
                                    />
                                    
                                    <CustomSelect name="weekday" bgColor="#3c3c3c" color="white"  h="50px" option={days} position="relative" value={values.weekday.label} top="-8px"  onChange={(e) => {
                                        let weekday = days?.find(matter => matter.label === e.target.value)
                                        console.log(weekday)
                                        setFieldValue('weekday', weekday)
                                    }}
                                    />
                                  
                                
                                    <Button type="submit" _hover={{bgColor:"#0bba5a"}}  h="50px" color="#FFF" minW="100px" bgColor="#0cdc6a">Filtrar</Button>
                                    <Button onClick={() => setFilters(undefined)} _hover={{bgColor:"#0bba5a"}} minW="100px"  h="50px" color="#FFF" bgColor="#0cdc6a">Limpar filtros</Button>
                        
                                </InputGroup>
                            </Flex>
                        </form>
                    )}
                </Formik>.
            {isModalOpen && (
                <CustomModal  
                isOpen={isModalOpen}
                linkButton={true}
                link={`https://wa.me/55${teachersContactNumbers}`}
                onClose={() => setIsModalOpen(false)}
                title="Entre em contato com seu professor"
                content={<RenderModalContent/>}
                sendButtonText="Abrir whatsapp"
                hoverColor="#20c96c"
                buttonBgColor="#04D361"
                />
            )}
            {loading ? (
                <Flex w="100vw" h="100vh" justify="center" alignItems="center">
                    <CircularProgress  isIndeterminate />
                </Flex>
            ) : (
                <>
                {teachers.length === 0 ? (
                    <Flex w="100%" h="100%" justifyContent="center" alignItems="center" >
                            
                        <Text  fontSize='l' mb={23} color="#9C98A6">Nenhuma solicitação foi encontrada &nbsp;</Text>
                    <BiSad color="#9C98A6" style={{marginBottom:"20px"}} />
                </Flex> 
                ) : (

                    teachers.filter(teacher => teacher.approved === 1).map((teacher, index) => (
                        <Card 
                        key={index}
                        className="scale-up-bottom"
                        teacher={teacher.fullName}
                        email={teacher.email}
                        isVerified={teacher.verify === 1 ? true : false}
                        school={teacher.discipline[0].discipline}
                        imageUrl={teacher.linkPhoto}
                        mainText={teacher.description}
                        price={teacher.hourCost}
                        schedules={teacher.schedules}
                        stars={teacher.stars}
                        submitButtonClick={() => submitButtonClick(index)}
                        />
                    ))
                )}
                </>
            )}
            
        </>
        

    )
}