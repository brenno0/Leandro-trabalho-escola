import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  } from "@chakra-ui/react"
import { ReactNode } from "react"

interface CustomGenericModalProps{
    title:string,
    content:ReactNode | string | (() => ReactNode);
    sendButtonText:string;
    onClick?: () => void;
    isOpen:boolean;
    onClose:() => void;
    buttonColor?:string;
    buttonBgColor?:string;
    hoverColor?:string;
    linkButton?:boolean;
    link?:string;
}


export function CustomModal({title, content, sendButtonText, onClick, isOpen,onClose, buttonColor,buttonBgColor, hoverColor, linkButton, link}: CustomGenericModalProps) {
    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {content}
            </ModalBody>
            <ModalFooter>
                {linkButton ? (
                     <a href={link}target="_blank" rel="noreferrer">
                        <Button  _hover={{backgroundColor:hoverColor ?? "blue.500"}}  bgColor={buttonBgColor ?? "blue.400"} color={buttonColor ?? "white"} mr={3} onClick={onClick ?? onClose}>
                            {sendButtonText}
                        </Button>
                    </a>
                ): (
                    <Button  _hover={{backgroundColor:hoverColor ?? "blue.500"}}  bgColor={buttonBgColor ?? "blue.400"} color={buttonColor ?? "white"} mr={3} onClick={onClick ?? onClose}>
                    {sendButtonText}
                    </Button>  
                )}
             
              <Button variant='ghost' onClick={onClose}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
