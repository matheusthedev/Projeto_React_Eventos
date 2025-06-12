import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroTipoUsuario from "../pages/cadastrarTipoDeUsuario/CadastrarTipoDeUsuario"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento"
import ListagemEventos from "../pages/listagemEventos/ListagemEventos"
import { useAuth } from "../contexts/AuthContext";


const Privado = (props) => {
    const { usuario } = useAuth();
    // token. idUsuario, tipoUsuario

    // Se não estiver autenticando, manda para a login
    if (!usuario) {
        return <Navigate to="/" />;
    }

    if (usuario.tipoUsuario !== props.tipoPermitido) {
        // ir para a tela de nao encontrado
        return <Navigate to="/" />;
    }

    // Senão, rederiza o componente passado
    return <props.Item />;
};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Login />} path="/" exact />

                <Route element={<Privado tipoPermitido="Admin" Item={CadastroTipoUsuario} />} path="/CadastrarTipoUsuario" />

                <Route element={<Privado tipoPermitido="Admin" Item={CadastroEvento} />} path="/CadastrarEvento" />

                <Route element={<Privado tipoPermitido="Admin" Item={CadastroTipoEvento} />} path="/CadastrarTipoEvento" />

                <Route element={<Privado tipoPermitido="Comum" Item={ListagemEventos} />} path="/ListagemEventos" />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;