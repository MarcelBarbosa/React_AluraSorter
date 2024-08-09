import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Rodape from "./rodape"
import { useListaParticipantes } from "../../State/hooks/useListaParticipantes"
import { useSorteador } from "../../State/hooks/useSorteador"

jest.mock('../../State/hooks/useListaParticipantes', () => {
    return{
        useListaParticipantes: jest.fn()
    }
})

const mockNavigate = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../../State/hooks/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigate
    }
})

describe('não existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })
    
    test('sorteio não pode ser iniciado', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')

        expect(botao).toBeDisabled()
    })
} )

describe('quando existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(['Ana', 'Bruna', 'Catarina'])
    })
    
    test('o sorteio pode ser iniciado', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')

        expect(botao).not.toBeDisabled()
    })

    test('o sorteio foi iniciado', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')

        fireEvent.click(botao)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith('/sorteio')
        expect(mockSorteio).toHaveBeenCalledTimes(1)
    })
})