import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaParticipantes } from "../../State/hooks/useListaParticipantes"
import Sorteio from "./sorteio"
import { useResultadoSorteio } from "../../State/hooks/useResultadoSorteio"

jest.mock('../../State/hooks/useListaParticipantes', () => {
    return{
        useListaParticipantes: jest.fn()
    }
})

jest.mock('../../State/hooks/useResultadoSorteio', () => {
    return{
        useResultadoSorteio: jest.fn()
    }
})

describe('página de sorteio', () => {
    const participantes = [
        'Ana', 
        'Bruna',
        'Catarina'
    ]
    
    const resultado = new Map([
        ['Ana', 'Bruna'],
        ['Bruna', 'Catarina'],
        ['Catarina', 'Ana']
    ])

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    })
    
    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length + 1)   //Porque já tem uma option por padrão (+1)
    })

    test('o amigo secreto é exibido quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o seu nome')
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const botao = screen.getByRole('button')
        fireEvent.click(botao)

        const amigoSecreto = screen.getByRole('alert')

        expect(amigoSecreto).toBeInTheDocument()
    })
})