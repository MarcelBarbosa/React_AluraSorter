import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {
    test('cada participante não sorteie o prórpio nome', () => {
        const participantes = [
            'Ana',
            'Bruna',
            'Catarina',
            'Raul',
            'Bianca',
            'Marcel',
            'Nathália'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})