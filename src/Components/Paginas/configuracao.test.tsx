import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Configuracao from "./configuracao"

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigate
    }
})

describe('a página de configuração', () => {
    test('deve ser renderizada corretamente', () => {
        const { container } = render(
            <RecoilRoot>
                <Configuracao />
            </RecoilRoot>
        )

        //teste de Snapshot
        expect(container).toMatchSnapshot()
    })
})