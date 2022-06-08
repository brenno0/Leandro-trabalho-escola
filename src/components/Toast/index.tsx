import {  useToast } from "@chakra-ui/react"

interface ToastProps {
    title:String;
    status:"error" | "success"
    description?:String;
}


export function CustomToast({ title,status, description}:ToastProps) {
    const toast = useToast()
    return (
        <>
        {status === "error" ? (
            toast({
            title: `${title}`,
            description: `${description}`,
            status: `error`,
            duration: 9000,
            isClosable: true,
        })) :
        toast({
            title: `${title}`,
            description: `${description}`,
            status: `success`,
            duration: 9000,
            isClosable: true,
        })}
        </>
    )
}
      
  