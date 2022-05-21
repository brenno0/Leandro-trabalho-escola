import * as Yup from 'yup';

export const days = [{value:1, label:"Segunda"},{value:2, label:"Terça"},{value:3, label:"Quarta"},{value:4,label:"Quinta"},{value:5, label:"Sexta"},{value:6,label:"Sábado"},{value:7,label:"Domingo"}];

export const initialValues = {
    name:"",
    photo:"",
    contact:"",
    biography:"",
    cpf:"",
    email:"",
    matterName:"Matemática",
    matter:{value:1, label:"Matemática"},
    hourCost:"",
    schoolSchedule:[{
        dayWeek:"Segunda",
        initialDate:"",
        finalDate:"",
    }]
}

export const validationSchema = Yup.object().shape({
    name:Yup.string().required("Este campo é obrigatório"),
    photo:Yup.string().required("Este campo é obrigatório"),
    contact:Yup.string().required("Este campo é obrigatório"),
    biography:Yup.string().min(300, 'Mínimo 300 caracteres').required("Este campo é obrigatório"),
    cpf:Yup.string().min(14, 'Mínimo 14 caracteres').required("Este campo é obrigatório"),
    email:Yup.string().email("Por favor digite um e-mail válido").required("Este campo é obrigatório"),
    matterName:Yup.string(),
    matter:Yup.object().shape({
        value:Yup.number(),
        label:Yup.string(),
    }).required(),
    hourCost:Yup.string().required("Este campo é obrigatório"),
    schoolSchedule:Yup.array().of(
        Yup.object().shape({
            dayWeek:Yup.string(),
            initialDate:Yup.string().required("Este campo é obrigatório"),
            finalDate:Yup.string().required("Este campo é obrigatório"),
        })
    ).min(1)
})
