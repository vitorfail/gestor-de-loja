import React, { Component } from "react"
import "./EstoqueMostrar.css";
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";
import PopupEstoque from "../PopupEstoque/PopupEstoque";

export default class EstoqueMostrar extends Component{
    constructor(props){
        super()
        this.state = {
            mostrar: "popup-estoque"
        }
        this.abrir_popup = this.abrir_popup.bind(this)
    }

    abrir_popup() {
        this.setState({mostrar: "popup-estoque mostrar"})
    }
    fechar_popup(){
        this.setState({mostrar: "popup-estoque"})
    }
    mostrar_estoque(props){
        var data = props.conteudo 
        if(data === '1' || data === 'Usuário não autenticado'){
            Exit()
        }
        else{
            for(var i=0; i< 15; i++){
               this.lista.push( <div  key={(res.data.data[2])[i]+(res.data.data[0])[i]} className="entrada">
                        <div className="descri-2">
                            <h3>Roupa</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>300</h3>
                        </div>
                        <div className="custo-2">
                            <h3>300</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>)
            }
            this.setState({resultado: this.lista})
        }

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
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Roupa</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>300</h3>
                        </div>
                        <div className="custo-2">
                            <h3>300</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Roupa</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>300</h3>
                        </div>
                        <div className="custo-2">
                            <h3>300</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Roupa</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>300</h3>
                        </div>
                        <div className="custo-2">
                            <h3>300</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Saia</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>10</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 10,77</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Bermuda</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>20</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 50.00</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 60,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Calça jeans</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>20</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 40,00</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Roupa infantil</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>40</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 20,00</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Calcinha tamanho 20</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>145</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 45,00</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
                    <div className="entrada">
                        <div className="descri-2">
                            <h3>Roupa intima masculina tamnho 30m</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>80</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ 12,00</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>13%</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ 43,00</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>
    
                </div>
                <div className="botoes">
                    <button className="add" onClick={(event)=> this.abrir_popup()}>Adicionar</button>
                    <button className="del">Excluir</button>
                </div>
            </div>
        )    
    }
}
