import React, { useEffect, useState } from 'react'
import api from "../../Services/services";
import "./Modal.css"
import ImgDeletar from "../../assets/img/deletar2.png"

const Modal = (props) => {


    const [comentarios, setComentarios] = useState([]);

    const[novoComentario, setNovoComentario] = useState("")

    const [usuarioId, setUsuarioId] = useState("95597569-1db7-42ae-9612-1ebb909b857b")

    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);
            setComentarios(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarComentarios();
    }, []);

    async function cadastrarComentario(comentario) {
        try {
            await api.post("ComentariosEventos", {
                idUsuario: usuarioId,
                idEvento: props.idEvento,
                descricao: comentario})
        } catch (error) {
            console.log(error)
        }
    }

    async function deletarComentario(idComentario) {
        try {
            await api.delete(`ComentariosEventos/${idComentario}`)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={ImgDeletar} alt="Deletar" />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escreva seu comentario..." 
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)}
                                />
                                <button onClick={(item) => cadastrarComentario()}>Cadastrar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;