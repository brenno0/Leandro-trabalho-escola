import * as yup from 'yup'

export const initialValues = {
    username:'',
    password:''
}

export const validationSchema = yup.object().shape({
    username:yup.string().required("Campo obrigatório"),
    password:yup.string().required("Campo obrigatório"),
})