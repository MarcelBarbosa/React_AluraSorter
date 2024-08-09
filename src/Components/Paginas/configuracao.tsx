import Cabecalho from "../Cabecalho"
import Card from "../Card"
import Formulario from "../Formulario/formulario"
import ListaParticipantes from "../ListaParticipantes/listaParticipantes"
import Rodape from "../Rodape/rodape"

const Configuracao = () => {
    return(
       <>
       <Cabecalho />
       <Card>
            <section>
                <h2>Vamos começar!</h2>
                <Formulario />
                <ListaParticipantes />
                <Rodape />
            </section>
       </Card>
       </>
    )
}

export default Configuracao