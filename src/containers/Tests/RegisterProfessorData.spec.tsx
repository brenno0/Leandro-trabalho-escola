import {  render } from "@testing-library/react"
import   userEvent  from "@testing-library/user-event"
import { RegisterProfessorData } from "../RegisterProfessorData"

describe('RegisterProfessorData screen arrays', () => {
    it('Should be able to render a new form when "new" Button was clicked',async () => {
        const { getByText, findAllByTestId } =   render(<RegisterProfessorData />)
        //ToHaveAttribute é usado após encontrar o elemento com um getByText

        const newSchedulingButton = getByText("Novo Horário")
        await userEvent.click(newSchedulingButton)
       
        //Verificará apenas o primeiro click no botão
        expect(await findAllByTestId('formContainerTest')).toHaveLength(2)
    })

    it('Should be able to remove a field when remove button was clicked',async () => {
        const { getByText, queryAllByTestId } = render(<RegisterProfessorData />)

        //ToHaveAttribute é usado após encontrar o elemento com um getByText
        const newSchedulingButton = getByText("Novo Horário")

        await userEvent.click(newSchedulingButton)
        const buttonRemove = queryAllByTestId('remove')
        
        await userEvent.click(buttonRemove[1])

        expect(queryAllByTestId('remove')).toHaveLength(1)
    })
    
})