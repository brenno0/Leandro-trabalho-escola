import { FormControl, FormLabel, Textarea, FormErrorMessage, TextareaProps } from "@chakra-ui/react"
import {Field, FieldProps } from 'formik'
import { ForwardRefRenderFunction } from "react"

interface CustomInputProps extends TextareaProps {
    name:string;  
    label?:string;
}

export const CustomTextarea:ForwardRefRenderFunction<HTMLTextAreaElement,CustomInputProps> = ({name,label, ...rest}) => {
    return (
        <Field name={name}>
            {({field,form,meta}: FieldProps) => (
                <FormControl isInvalid={meta.touched && !!meta.error}>
                    <FormLabel color="gray.400">{label}</FormLabel>
                    <Textarea 
                        {...field}
                        errorBorderColor="pink.300"
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