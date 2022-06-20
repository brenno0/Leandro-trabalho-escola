import { render } from "@testing-library/react"
import { Login } from "../Login"


jest.mock('../../store')
jest.mock('react-router-dom/useHistory', () => {
    return {
        location:{
            hash: "",
            pathname: "/",
            search: "",
            state: undefined
        }
    }
})

describe('Login Screen', () => {
    it('submits the form information', async () => {
        const { getByTestId } =  render(<Login />)
        const usernameInput = getByTestId('username')
        const passwordInput = getByTestId('password')
        console.log(usernameInput)
        console.log(passwordInput)
    })
})