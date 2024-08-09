import { fireEvent, render, screen } from '@testing-library/react'
import Formulario from './formulario'
import { RecoilRoot } from 'recoil'
import { act } from 'react-dom/test-utils'

describe('Comportamento do formulario.tsx', () => {
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        //renderizar o compontente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>) //ARRANGE
    
        //encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes') //ACT
    
        //encontrar o botão
        const botao = screen.getByRole('button') //ACT
    
        //garantir que o input esteja no documento
        expect(input).toBeInTheDocument() //ASSERT
    
        //garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled //ASSERT
    })
    
    test('adicionar um participante caso exista um nome preenchido', () => {
        //renderizar o compontente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)     //ARRANGE
    
        //encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes') //ACT
    
        //encontrar o botão
        const botao = screen.getByRole('button') //ACT
    
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        //clicar no botão de submeter
        fireEvent.click(botao)
    
        //garantir que o input esteja focado
        expect(input).toHaveFocus()
    
        //garantir que o input não tenha um valor
        expect(input).toHaveValue('')
    })
    
    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes') 
        const botao = screen.getByRole('button')
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
    
        const mensagemErro = screen.getByRole('alert')
    
        expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('mensagem de erro some depois de N segundos', () => {
        jest.useFakeTimers()
        
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes') 
        const botao = screen.getByRole('button')
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        fireEvent.click(botao)
        let mensagemErro = screen.queryByRole('alert')        //get => TEM que existir a Role
        expect(mensagemErro).toBeInTheDocument()
    
        act(() => {
            //updates no estado a serem feitos durante os testes (act)
            //esperar N segundos
            jest.runAllTimers()
          })
    
    
        mensagemErro = screen.queryByRole('alert')          //query => PODE existir a Role
        expect(mensagemErro).toBeNull()
    })
    
})

// Jest

