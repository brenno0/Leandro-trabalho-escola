import { Flex, Text, Spinner, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { dashboardApi } from '../../api/dashboardApi'
import { teacherApi } from "../../api/teacherApi";
import { errorMessages } from "../../common/utils/errorMessages";
import { ApprovalCard } from "../../components/ApprovalCard";
import { Header } from "../../components/Header";
import { BiSad } from 'react-icons/bi'

interface Schedules {
    dayWeek: string;
    finalDate: string;
    id: Number;
    initialDate: string;
}

interface Discipline {
    discipline: string;
    flagStandard: Number | Boolean;
    id: Number;
}

interface CardInformations {
    id: Number;
    teacherApproved: Number;
    teachers: {
        approved: Number;
        cpfOrCnpj: string;
        description: string;
        discipline: Discipline[];
        email: string;
        fullName: string;
        hourCost: string;
        id: number;
        linkPhoto: string;
        schedules: Schedules[];
        stars: Number;
        verify: Number;
        whatsApp: string;
    }
}


export const ApproveDisapprove = () => {
    
    
    const [teachers, setTeachers] = useState<CardInformations[]>([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    
    const getData = useCallback(() => {
        
        setLoading(true);
        dashboardApi.list()
        .then(res => {
            res.data = res.data.map((r: any) => {
                return {
                    ...r,
                    teachers:r.teachers[0]
                }
            })
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
    
    useEffect(() => {
        getData();
    }, [getData])

    const selectNewStarsNumber = (stars:Number, teacher:CardInformations) => {
        teacherApi.stars(teacher.teachers.id, stars)
        .then(res => {
            toast({
                description: `Alteração realizada com sucesso, o professor selecionado agora tem ${stars} estrelas`,
                status: `success`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        }).catch(err => {
            toast({
                description: `${errorMessages.catch_error(err)}`,
                status: `error`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        })
    }

    const onApprove = (id:Number) => {
        dashboardApi.approve(id)
        .then((res) => {
            toast({
                description: `Solicitação aprovada com sucesso`,
                status: `success`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
            getData()
        })
        .catch((err) => {
            toast({
                description: `${errorMessages.catch_error(err)}`,
                status: `error`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        })        
    }
    const onDisapprove = (id:Number) => {
        dashboardApi.disapprove(id)
        .then((res) => {
            getData()
            toast({
                description: `Solicitação reprovada com sucesso`,
                status: `success`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })

        })
        .catch(async (err) => {
            toast({
                description: `${errorMessages.catch_error(err)}`,
                status: `error`,
                duration: 5000,
                position:"bottom-right",
                isClosable: true,
            })
        })      
    }

    const onVerify = (id:Number, isVerified:Number) => {
        if(!isVerified){
            teacherApi.verify(id)
            .then(() => {
                toast({
                    description: `Professor verificado com sucesso`,
                    status: `success`,
                    duration: 5000,
                    position:"bottom-right",
                    isClosable: true,
                })
                getData()
            }).catch(err => {
                toast({
                    description: `${errorMessages.catch_error(err)}`,
                    status: `error`,
                    duration: 5000,
                    position:"bottom-right",
                    isClosable: true,
                })
            })
        }else {
            teacherApi.unVerify(id)
            .then(() => {
                toast({
                    description: `Verificação removida com sucesso`,
                    status: `success`,
                    duration: 5000,
                    position:"bottom-right",
                    isClosable: true,
                })
                getData()
            }).catch(err => {
                toast({
                    description: `${errorMessages.catch_error(err)}`,
                    status: `error`,
                    duration: 5000,
                    position:"bottom-right",
                    isClosable: true,
                })
            })  
        }
    }
    
    
    return (
        <>
            <Header textTitle="Valide as solicitações de seus professores" />
            {loading ? (
                    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
                        <Spinner color="#000" />
                    </Flex>
            ): (
                <Flex w="100vw" h="100vh" justifyContent="center"  pt={10}>
                    {teachers.filter(teacher => teacher.teacherApproved === 0).length === 0 ? (
                        <Flex w="100%" h="100%" justifyContent="center" alignItems="center" >
                            
                            <Text  fontSize='l' mb={23} color="#9C98A6">Nenhuma solicitação foi encontrada &nbsp;</Text>
                            <BiSad color="#9C98A6" style={{marginBottom:"20px"}} />
                        </Flex>
                    ) : (

                        <Flex w={{md:"90%", lg:"90%", xl:"50%"}} flexWrap="wrap" h="10%" >


                            {teachers.filter(teacher => teacher.teacherApproved === 0).map((teacher,index) => (
                                <ApprovalCard 
                                starNumbersFunction={(stars:number) => selectNewStarsNumber(stars, teacher)}
                                teacher={teacher.teachers.fullName} 
                                email={teacher.teachers.email}  
                                mainText={teacher.teachers.description} 
                                imageUrl={teacher.teachers.linkPhoto} 
                                price={teacher.teachers.hourCost} 
                                isVerified={teacher.teachers.verify === 1 ? true : false} 
                                stars={teacher.teachers.stars}
                                school={teacher.teachers.discipline[0].discipline}
                                contact={teacher.teachers.whatsApp}
                                cpf={teacher.teachers.cpfOrCnpj}
                                onApprove={() => onApprove(teacher.id)} 
                                onDisapprove={() => onDisapprove(teacher.id)}
                                onVerify={() => onVerify(teacher.teachers.id, teacher.teachers.verify)}
                                />
                            
                            ))}
                        </Flex>
                    )}
                </Flex>
            )}
        </>
    )
}