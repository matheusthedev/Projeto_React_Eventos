import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"

const CadastrarTipoDeUsuario = () => {
    return (
        <>
            <Header />
            <Cadastro
                titulo="Cadastrar Tipo de Usuario"
                visibilidade="none"
            />
            <Lista 
            titulo="Lista Tipo de Usuario"
            tdnome="Tipo de Usuario"
            />
            <Footer />
        </>
    )
}

export default CadastrarTipoDeUsuario;