import * as Yup from 'yup';


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
    contact:Yup.string().min(16, "Mínimo 9 caracteres").required("Este campo é obrigatório"),
    biography:Yup.string().min(50, 'Mínimo 50 caracteres').max(500, 'Máximo 500 caracteres').required("Este campo é obrigatório"),
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
            initialDate:Yup.string().min(5, "Mínimo 5 caracteres").required("Este campo é obrigatório"),
            finalDate:Yup.string().min(5, "Mínimo 5 caracteres").required("Este campo é obrigatório"),
        })
    ).min(1)
})
