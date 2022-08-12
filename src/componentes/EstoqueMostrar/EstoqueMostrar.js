import React, { Component } from "react"
import "./EstoqueMostrar.css";
import PopupEstoque from "../PopupEstoque/PopupEstoque";
import Exit from "../../Exit";

export default class EstoqueMostrar extends Component{
    constructor(props){
        super()
        this.state = {
            mostrar: "popup-estoque",        
        }
        this.abrir_popup = this.abrir_popup.bind(this)
    }
    
    abrir_popup() {
        this.setState({mostrar: "popup-estoque mostrar"})
    }
    fechar_popup(){
        this.setState({mostrar: "popup-estoque"})
    }
    render(){
        return(
            <div className="mostrar-estoque">
                <PopupEstoque exibir={this.state.mostrar} fechar= {this.fechar_popup.bind(this)}></PopupEstoque>
                <div className="tabela">
                    <div className="titulo">
                        <div  className="descricao">
                            <h3>Nome</h3>
                        </div>
                        <div className="qtd">
                            <h3>Quantidade</h3>
                        </div>
                        <div className="custo">
                            <h3>Custo</h3>
                        </div>
                        <div className="lucro">
                            <h3>Lucro(%)</h3>
                        </div>
                        <div className="preco">
                            <h3>Preço</h3>
                        </div>
                        <div className="editar">
                            <h3>Editar</h3>
                        </div>
                        <div className="excluir">
                            <h3>Excluir</h3>
                        </div>
                    </div>
                    {this.props.conteudo}
                </div>
                <div className="botoes">
                    <button className="add" onClick={(event)=> this.abrir_popup()}>Adicionar</button>
                    <button className="del">Excluir</button>
                </div>
            </div>
        )    
    }
}
