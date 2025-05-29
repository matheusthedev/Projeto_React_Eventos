import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'


import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemEventos.css"
import Comentario from "../../assets/img/comentario.png"
import Toggle from "../../components/toggle/Toggle";



const ListagemEventos = (props) => {
    const [listaEvento, setListaEvento] = useState([])


    async function listarEvento() {
        try {
            const resposta = await api.get("eventos")
            setListaEvento(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEvento();
    }, [listaEvento]);

    return (
        <>
            <Header nomeUsu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled selected>Todos os Eventos</option>
                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    {props.lista && props.lista.length > 0 ? (
                    props.lista.map((item) => (
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >{item.nomeEvento}</td>
                            <td>{item.dataEvento}</td>
                            <td data-cell="Evento">{item.tipoEvento}</td>
                            <td data-cell="Comentar"><img src={Comentario} alt="Imagem de um comentario" /></td>
                            <td data-cell="Botao"><Toggle /></td>
                        </tr>
                    </tbody>
                    ))
                ) :
                    (
                        <p>Nenhum Evento Encontrado.</p>
                    )
                }
                </div>
            </section>
            <Footer />
            
        </>
    )
}

export default ListagemEventos;