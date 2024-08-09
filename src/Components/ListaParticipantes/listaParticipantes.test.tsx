import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ListaParticipantes from './listaParticipantes'
import { useListaParticipantes } from '../../State/hooks/useListaParticipantes'

jest.mock('../../State/hooks/useListaParticipantes', () => {
    return{
        useListaParticipantes: jest.fn()
    }
})

describe('uma lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([])
    })
    
    test('deve ser renderizada sem elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
    
            const items = screen.queryAllByRole('listitem')
            expect(items).toHaveLength(0)
    })
})

describe('uma lista preenchida de participantes', () => {
    const participantes = ['Ana', 'Catarina']
    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
    })

    test('deve ser renderizada sem elementos', () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>
        )
    
            const items = screen.queryAllByRole('listitem')
            expect(items).toHaveLength(participantes.length)
    })
})