import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"

const CadastrarTipoEvento = () => {
    return (
        <>
            <Header />
            <Cadastro
                titulo="Cadastrar Tipo de Evento"
                visibilidade="none"
            />
            <Lista 
            titulo="Lista Tipo de evento"
            tdnome="Tipo de Evento"
            />
            <Footer />
        </>
    )
}

export default CadastrarTipoEvento;