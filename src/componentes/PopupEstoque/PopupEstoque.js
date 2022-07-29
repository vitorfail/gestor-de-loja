
import "./PopupEstoque.css";
import React, {Component, useState} from "react";

export default class PopupEstoque extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir
        }
    }

    render(){
        return(
            <div className={this.props.exibir}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Novo produto</h1>
                        </div>
                        <div className="input">
                            <input></input>
                            <label className="nome">Nome da peça</label>
                        </div>
                        <div className="input">
                            <input></input>
                            <label className="nome">Custo</label>
                        </div>
                        <div className="input">
                            <input></input>
                            <label className="nome">Quantidade</label>
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add" >Adicionar</button>
                        <button  className="cancel" onClick={(event) => this.props.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
