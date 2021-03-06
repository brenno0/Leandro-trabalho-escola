import { FormControl, FormLabel, FormErrorMessage, Select, SelectProps } from "@chakra-ui/react"
import {Field, FieldProps } from 'formik'
import { ForwardRefRenderFunction } from "react"
import tinycolor from 'tinycolor2'

interface CustomInputProps extends SelectProps {
    name:string;  
    label?:string;
    option:any[];
    isLoading?:boolean | undefined
}

export const CustomSelect:ForwardRefRenderFunction<HTMLSelectElement,CustomInputProps> = ({name,label,option, isLoading,...rest}) => {
        const optionBackground = tinycolor(String(rest?.bgColor)).lighten(-10).toString()

    return (
        <Field name={name}>
            {({field,form,meta}: FieldProps) => (
                <FormControl isInvalid={meta.touched && !!meta.error}>
                    <FormLabel color="gray.400">{label}</FormLabel>
                    <Select 
                        {...field}
                        bgColor={"gray.50"} 
                        errorBorderColor="pink.300"
                        focusBorderColor="indigo.300"
                        {...rest}
                    >
                       {option.map((option, index) => (
                            <option style={{backgroundColor:rest?.bgColor ? String(optionBackground) : "white"}} key={index}>{option.label}</option>
                        ))}
                    </Select>
                    {!!meta.error && <FormErrorMessage> {meta.error}  </FormErrorMessage> }
                    
                </FormControl>
            )}
        </Field>
    )
}