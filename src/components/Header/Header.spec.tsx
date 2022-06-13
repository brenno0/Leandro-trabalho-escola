import { render } from '@testing-library/react'
import { Header } from '.'


describe('Header Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Header textTitle="Texto teste" />)
        expect(getByText("Texto teste")).toBeTruthy()
    })
    it('Should be able to render text element', () => {
        const { getByText } = render(<Header textTitle="Texto teste" text="Teste" />)
        expect(getByText("Teste")).toBeTruthy()
    })
})