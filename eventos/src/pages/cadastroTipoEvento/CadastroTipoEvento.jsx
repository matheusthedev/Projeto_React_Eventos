import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/banner.png"

const CadastrarTipoEvento = () => {
    return (
        <>
            <Header nomeUsu="Administrador"/>
            <Cadastro
                titulo="Cadastrar Tipo de Evento"
                visibilidade="none"
                imagem={Banner}
                place="Titulo"
            />
            <Lista 
            titulo="Lista Tipo de evento"
            tdnome="Nome Evento"
            tituloEvento="Titulo"
            
            />
            <Footer />
        </>
    )
}

export default CadastrarTipoEvento;