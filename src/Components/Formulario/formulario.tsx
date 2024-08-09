import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../State/hooks/useAdicionarParticipante";
import { useMensagemErro } from "../../State/hooks/useMensagemErro";
import styles from './formulario.module.css'

const Formulario = () => {

    const [nome, setNome] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const adicionarNaLista = useAdicionarParticipante()
    const mensagemErro = useMensagemErro()

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()
    }

    return (
        <form onSubmit={adicionarParticipante}>
            <div className={styles['grupo-input-btn']}>
                <input
                    ref={inputRef}
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    type="text"
                    placeholder="Insira os nomes dos participantes"
                />
                <button disabled={!nome}>Adicionar</button>
            </div>
            {mensagemErro && <p role='alert'>{mensagemErro}</p>}
        </form>
    )
}

export default Formulario;