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
    const [listaEventos, setListaEventos] = useState([])
    // Modal
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);

    const [filtroData, setFiltroData] = useState("todos")

    const [usuarioId, setUsuarioId] = useState("95597569-1db7-42ae-9612-1ebb909b857b")

    async function listarEventos() {
        try {
            //pego o eventos em geral
            const resposta = await api.get("eventos");
            const todosOsEventos = resposta.data;
            const respostaPresencas = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresencas.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return {
                    ...atualEvento,

                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEventos(eventosComPresencas)


        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }


    useEffect(() => {
        listarEventos();
    }, [])

    function abrirModal(tipo, dados) {
        // tipos de modal
        // dados
        setModalAberto(true)
        setTipoModal(tipo)
        setDadosModal(dados)
    }

    function fecharModal(tipo, dados) {
        // tipos de modal
        // dados
        setModalAberto(false)
        setTipoModal(tipo)
        setDadosModal(dados)
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca != "") {
                await api.put(`PresencasEventos/${idPresenca}`, {situacao: false});
                Swal.fire(`Removido!`, `Sua presença foi removida`, 'success')
            } else if (idPresenca != "") {
                await api.put(`PresencasEventos/${idPresenca}`, {situacao: true})
                Swal.fire(`Confirmado!`, `Sua presença foi Confirmada`, 'success')
            } else {
                await api.put(`PresencasEventos`, {situacao: true, idUsuario: usuarioId, idEvento: idEvento})
                Swal.fire(`Confirmado!`, `Sua presença foi Confirmada`, 'success')
            }

            listarEventos()
        } catch (error) {
            console.log(error)
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros")&& dataEvento > hoje) return true ;
            if (filtroData.includes("futuros")&& dataEvento < hoje) return true ;
                
            return false;
        })
    }

    return (
        <>
            <Header nomeUsu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select onChange={(e) => setFiltroData([e.target.value])} name="Todos os Eventos" id="" className="select_evento">
                        <option value="todos" selected>Todos os Eventos</option>
                        <option value="futuros" >Somente futuros</option>
                        <option value="passados" >Somente passados</option>
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
                        {filtrarEventos().map((item) => (
                            <tr className="item_evento">
                                <td data-cell="Nome" >{item.nomeEvento}</td>
                                <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                <td data-cell="Tipo_Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                <td data-cell="Descricao"><img src={Detalhes} alt="Imagem de descricao" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })} style={{ cursor: "pointer" }} /></td>
                                <td data-cell="Comentar"><img src={Comentario} alt="Imagem de um comentario" onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })} style={{ cursor: "pointer" }} /></td>
                                <td data-cell="Botao"><Toggle
                                    presenca={item.possuiPresenca}
                                    manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca)}
                                /></td>
                            </tr>

                        ))}
                    </tbody>

                </div>
            </section>
            <Footer />
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal}
                />
            )}

        </>
    )
}

export default ListagemEventos;