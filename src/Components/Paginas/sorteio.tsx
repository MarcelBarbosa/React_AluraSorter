import { useState } from "react"
import { useListaParticipantes } from "../../State/hooks/useListaParticipantes"
import { useResultadoSorteio } from "../../State/hooks/useResultadoSorteio"
import styles from './sorteio.module.css'
import Card from "../Card"
import Cabecalho from "../Cabecalho"

const Sorteio = () => {
    const participantes = useListaParticipantes()
    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')


    const resultado = useResultadoSorteio()

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
        }
    }

    return (
        <>
        <Cabecalho />
        <Card>
            <section className={styles.sorteio}>
                <form onSubmit={sortear}>
                    <select
                        required
                        name="participanteDaVez"
                        id="participanteDaVez"
                        placeholder="Selecione o seu nome"
                        value={participanteDaVez}
                        onChange={evento => setParticipanteDaVez(evento.target.value)}
                    >
                        <option>Selecione o seu nome</option>
                        {participantes.map(participante => <option key={participante}>{participante}</option>)}
                    </select>
                    <p>Clique em sortear para ver quem é seu amigo secreto!</p>
                    <button className={styles['botao-sortear']}>Sortear</button>
                </form>
                {amigoSecreto && <p className={styles.resultado} role="alert">{amigoSecreto}</p>}
                <footer className={styles.sorteio}>
                    <img src="/imagens/aviao.png" className={styles.aviao} alt="Um desenho de um avião de papel" />
                </footer>
            </section>
        </Card>
        </>
    )
}

export default Sorteio