import { useCallback, useEffect, useState } from "react";
import { teacherApi } from "../../api/teacherApi";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import './style.css';
import { Button, CircularProgress, Flex, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { CustomModal } from "../../components/Dialog";
import { FiCopy } from 'react-icons/fi'
import { BsCheck2 } from 'react-icons/bs'
import { errorMessages } from "../../common/utils/errorMessages";

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
    const toast = useToast()


    useEffect(() => {
        setLoading(true)
        teacherApi.list()
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
    }, [])

    const submitButtonClick = useCallback((index:number) => {
        setTeachersContact(teachers[index].whatsApp)
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
                <Button h='1.75rem' size='sm'  _hover={{backgroundColor:"teal.400"}}bgColor={!isCheckIconVisible ? "teal.300" : "#00ea69"} color="white" onClick={async () => {
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

    
    
    return (
        <>

            <Header
            textTitle="Estes são os professores disponíveis"
            text="Basta filtrar por matérias e escolher seu professor!"
            />
            {/* <InputGroup size='md' display="flex" justifyContent="center" gap="8px" position="relative" top="-20px">
                <Input
                pr='4.5rem'
                value={teachersContact}
                placeholder='Contato'
                width='20%'
                />
                <Input
                pr='4.5rem'
                value={teachersContact}
                placeholder='Contato'
                width='20%'
                />
                <Input
                pr='4.5rem'
                value={teachersContact}
                placeholder='Contato'
                width='20%'
                />
    
            </InputGroup> */}
            {isModalOpen && (
                <CustomModal  
                isOpen={isModalOpen}
                linkButton={true}
                link={"https://web.whatsapp.com/"}
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
                {teachers.filter(teacher => teacher.approved === 1).map((teacher, index) => (
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
                ))}
                </>
            )}
            
        </>
        

    )
}