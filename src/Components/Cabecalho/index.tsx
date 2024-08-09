// src/componentes/Cabecalho/index.tsx
import styles from './estilos.module.css';

const Cabecalho = () => {
    return (
        <header className={styles.cabecalho}>
            <div className={styles['imagem-logo']} role="img" aria-label='Logo do Sorteador'></div>
            <img className={styles.participante} src="/imagens/participante.png" alt="Participante com um presente na mão" />
        </header>
    )
}

export default Cabecalho
