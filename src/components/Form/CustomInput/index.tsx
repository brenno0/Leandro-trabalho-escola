import { FormControl, FormLabel, Input, FormErrorMessage, InputProps } from "@chakra-ui/react"
import {Field, FieldProps } from 'formik'
import { ForwardRefRenderFunction } from "react"

interface CustomInputProps extends InputProps {
    name:string;  
    label?:string;
    mask?:string;
    maskChar?:string | null;
}

export const CustomInput:ForwardRefRenderFunction<HTMLInputElement,CustomInputProps> = ({name,label,mask,maskChar, ...rest}) => {
    return (
        <Field name={name}>
            {({field,form,meta}: FieldProps) => (
                <FormControl isInvalid={meta.touched && !!meta.error}>
                    <FormLabel color="gray.400">{label}</FormLabel>
                    <Input 
                        errorBorderColor="pink.300"
                        {...field}
                        mask={mask}
                        maskChar={maskChar}
                        bgColor="gray.50" 
                        focusBorderColor="indigo.300"
                        {...rest}
                    />

                    {!!meta.error && <FormErrorMessage> {meta.error}  </FormErrorMessage> }
                    
                </FormControl>
            )}
        </Field>
    )
}