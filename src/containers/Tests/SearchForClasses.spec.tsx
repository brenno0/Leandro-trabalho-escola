import { render } from '@testing-library/react'
import axios from 'axios'
import { testsRequestDataGet } from "../../__mocks__/fetch"
jest.mock('axios')

//Comentários no teste feitos para estudos e afins
/**
 * 1. Mockar o GET do axios,
 * 2. Criar um resultado simulado da api usando o mockResolveValueOnce
 * 3. Criar separado uma função que faça as requisições no axios e chama-lá no teste
 * 4. Chamar a api mockada passando a URL
 * 5. Fazer um expect comparando o resultado das duas requisições
 */
describe("Search for classes screen", () => {
    it('should make axios request when screen loads', async () => {

        const mockedAxios = jest.mocked(axios.get)

        const fakeResult = [
            {id:48, fullName:"John"},
            {id:49, fullName:"Doe"}
        ]

        mockedAxios.mockResolvedValueOnce(fakeResult)

        const result = await testsRequestDataGet('teacher/all')
        
        expect(mockedAxios).toHaveBeenCalledWith("https://api-prof.herokuapp.com/api/teacher/all")
        expect(result).toEqual(fakeResult);
    })
})