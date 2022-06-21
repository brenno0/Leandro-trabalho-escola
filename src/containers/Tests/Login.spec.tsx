import { render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import { testsRequestDataPost } from "../../__mocks__/fetch"
import { Login } from "../Login"

jest.mock('../../store')
jest.mock('axios')

describe('Login Screen', () => {
    it('let the user submit the form if inputs are filled', async () => {
        const { getByTestId, getByText } =  render(<Login />)

        const usernameInput = getByTestId('username')
        const passwordInput = getByTestId('password')

        await userEvent.type(usernameInput, "LeandroHsn")
        await userEvent.type(passwordInput, "senhaTeste")

        expect(getByText("Enviar")).not.toBeDisabled()
    
    })
    it("doesn't let user click on submit button if inputs are not filled", async () => {
        const { getByTestId, getByText } =  render(<Login />)

        const usernameInput = getByTestId('username')
        const submitButton = getByText("Enviar")

        await userEvent.type(usernameInput, "LeandroHsn")
        userEvent.click(submitButton)

        expect(getByText("Enviar")).toBeDisabled()
    
    })
    it('Call post Api', async () => {
        const mockedAxios =  jest.mocked(axios.post)

        const body =  {
            username:"John",
            password:"Doe"
        }
        const data = {
            success: 1,
            accessToken:"fake-access-token",
            email:"johnDoe@fake.com",
            username:"johnDoe"
        }

        mockedAxios.mockResolvedValueOnce(data)

        const result =  await testsRequestDataPost("auth/signin", body)

        expect(mockedAxios).toHaveBeenCalledWith("https://api-prof.herokuapp.com/api/auth/signin", {"password": "Doe", "username": "John"})
        expect(result).toEqual(data);
    })
})