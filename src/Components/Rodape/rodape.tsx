import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../../State/hooks/useListaParticipantes"
import styles from './rodape.module.css'
import { useSorteador } from "../../State/hooks/useSorteador"

const Rodape = () => {
    const participantes = useListaParticipantes()
    const navigate = useNavigate()
    const sortear = useSorteador()

    const iniciar = () => {
        sortear()
        navigate('/sorteio')
    }

    return (
        <footer className={styles['rodape-configuracoes']}>
            <button
                className={styles.botao}
                disabled={participantes.length < 3}
                onClick={iniciar}
            >Iniciar Sorteio
            </button>
            <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
        </footer>
    )
}

export default Rodape