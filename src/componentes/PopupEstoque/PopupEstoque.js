
import "./PopupEstoque.css";
import React, {Component, useState} from "react";
import Axios from "../../Axios";

export default class PopupEstoque extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            user_id_: '',
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:''
        }
        this.add_produtos = this.add_produtos.bind(this) 
    }
    add_produtos(){
        Axios.post('index.php?url=inserirprodutos/pesquisa', {user_id:this.state.user_id_ ,
            produto_nome:this.state.produto_nome_ , produto_valor: this.state.produto_valor_, 
            percentual:this.state.percentual_, quantidade:this.state.quantidade_ }).then(res =>{
                if(res.data.data === '1'){
                    this.props.fechar()
                }
                if(res.data.data === '0'){

                }
            }).catch(erro =>{

            })
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
                        <button className="add" onClick={(event) => this.add_produtos} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => this.props.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
