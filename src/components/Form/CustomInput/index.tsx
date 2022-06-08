import { FormControl, FormLabel, Input, FormErrorMessage, InputProps, InputRightElement, InputGroup, IconButton } from "@chakra-ui/react"
import {Field, FieldProps } from 'formik'
import { ForwardRefRenderFunction, JSXElementConstructor, ReactElement, ReactNode } from "react"

interface CustomInputProps extends InputProps {
    name:string;  
    label?:string;
    mask?:string;
    maskChar?:string | null;
    hasRightIconButton?:boolean;
    hasRightIcon?:boolean;
    icon?:ReactNode;
    onIconButtonClick?:() => void | (() => {});
}

export const CustomInput:ForwardRefRenderFunction<HTMLInputElement,CustomInputProps> = ({name,label,mask,maskChar,hasRightIcon = false, icon = false,hasRightIconButton = false,onIconButtonClick, ...rest}) => {
    return (
        <Field name={name}>
            {({field,form,meta}: FieldProps) => (
                <FormControl isInvalid={meta.touched && !!meta.error}>
                    <FormLabel color="gray.400">{label}</FormLabel>
                    {!hasRightIconButton && !hasRightIcon ? (
                        <Input 
                            errorBorderColor="pink.300"
                            {...field}
                            mask={mask}
                            maskChar={maskChar}
                            bgColor="gray.50" 
                            focusBorderColor="indigo.300"
                            {...rest}
                        />
                    ) : hasRightIcon ? (
                        <InputGroup>
                            <Input 
                            errorBorderColor="pink.300"
                            {...field}
                            mask={mask}
                            maskChar={maskChar}
                            bgColor="gray.50" 
                            focusBorderColor="indigo.300"
                            {...rest}
                            />
                            <InputRightElement width='4.5rem'>
                                {icon} 
                            </InputRightElement>

                        </InputGroup>

                    ) : hasRightIconButton && (
                        <InputGroup>
                        <Input 
                        errorBorderColor="pink.300"
                        {...field}
                        mask={mask}
                        maskChar={maskChar}
                        bgColor="gray.50" 
                        focusBorderColor="indigo.300"
                        {...rest}
                        />
                        <InputRightElement width='4.5rem'>
                        <IconButton
                        onClick={onIconButtonClick}
                        bgColor="transparent"
                        aria-label='Search database'
                        icon={icon as ReactElement<any, string | JSXElementConstructor<any>> }
                        />
                        </InputRightElement>

                    </InputGroup>
                    )}
                    

                    {!!meta.error && <FormErrorMessage> {meta.error}  </FormErrorMessage> }
                    
                </FormControl>
            )}
        </Field>
    )
}