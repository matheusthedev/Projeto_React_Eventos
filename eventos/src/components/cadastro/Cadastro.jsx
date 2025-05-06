import "./Cadastro.css"
import Logo_banner from "../../assets/img/banner.png"
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <main className="main_cadastro">
            <div className="titulo">
                <h1>{props.titulo}</h1>
                <hr />
            </div>

            <section className="section_cadastro">
                <div className="banner_cadastro">
                    <img src={Logo_banner} alt="Fundo banner do cadastro eventos" />
                </div>

                <form action="" className="layout_grid form_cadastro">

                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">
                            <label htmlFor="Nome"></label>
                            <input type="text" name="nome" placeholder="Nome" />
                        </div>
                        <div className="campo_cad_titulo" style={{display: props.visibilidade}}>
                            <label htmlFor="Nome"></label>
                            <select name="Tipo De Evento" id="">
                                <option value="" disabled selected>Tipo de Evento</option>
                                <option value="">op 1</option>
                                <option value="">op 2</option>
                                <option value=""> op 3</option>
                            </select>
                        </div>

                        <Botao nomeBotao="Cadastrar" />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Cadastro;