import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'
import { format, compareAsc } from "date-fns";


import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemEventos.css"
import Comentario from "../../assets/img/comentario.png"
import Detalhes from "../../assets/img/detalhe2.png"
import Toggle from "../../components/toggle/Toggle";
import Modal from "../../components/modal/Modal";



const ListagemEventos = (props) => {
    const [listaEventos, setListarEventos] = useState([])

    // hooks (ex: listaEventos)
    //    funcao para listar os eventos

    async function listarEventos() {
        try {
            const eventoListado = await api.get("eventos");

            setListarEventos(eventoListado.data);
            console.log(eventoListado.data);


        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        listarEventos();
    }, [])

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
                            <th>Descrição</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaEventos.map((item) => (
                            <tr className="item_evento">
                                <td data-cell="Nome" >{item.nomeEvento}</td>
                                <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                <td data-cell="Tipo_Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                <td data-cell="Descricao"><img src={Detalhes} alt="Imagem de descricao" style={{ cursor: "pointer" }}/></td>
                                <td data-cell="Comentar"><img src={Comentario} alt="Imagem de um comentario" /></td>
                                <td data-cell="Botao"><Toggle /></td>
                            </tr>

                        ))}
                    </tbody>

                </div>
            </section>
            <Footer />
            <Modal/>

        </>
    )
}

export default ListagemEventos;