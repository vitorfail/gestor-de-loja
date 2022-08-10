import React, { Component } from "react";
import "./Estoque.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import BlocosEstoque from "../../componentes/BlocosEstoque/BlocosEstoque";
import EstoqueMostrar from "../../componentes/EstoqueMostrar/EstoqueMostrar";
import Axios from "../../Axios";
import Exit from '../../Exit'
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";
import PopupEstoque from "../../componentes/PopupEstoque/PopupEstoque"
import PopupPagar from "../../componentes/PopupPagar/PopupPagar";

export default class Estoque extends Component{
    constructor(){
        super()
        this.lista =[];
        this.state = {
            estoque_valor: '',
            dias: '',
            nome:'',
            vencimento:'',
            dados:[],
            mostrar: "popup-estoque",
            mostrar_pagar:"popup-pagar"
        }
        this.iniciar= this.iniciar.bind(this)
        this.mostrar_estoque = this.mostrar_estoque.bind(this)
        this.abrir_popup = this.abrir_popup.bind(this)
        this.fechar_popup = this.fechar_popup.bind(this)
        this.fechar_popup_pagar = this.fechar_popup_pagar.bind(this)
    }
    componentDidMount(){
        this.iniciar()
    }
    abrir_popup() {
        this.setState({mostrar: "popup-estoque mostrar"})
    }
    fechar_popup(){
        this.setState({mostrar: "popup-estoque"})
    }
    fechar_popup_pagar(){
        this.setState({mostrar_pagar: "popup-pagar"})
    }
    mostrar_estoque(props){
        var data = props
        if(data === '1' || data === 'Usuário não autenticado'){
            Exit()
        }
        else{
            for(var i=0; i< data.length; i++){
                console.log(parseFloat(data[i]["produto_valor"]))
                var custo = parseFloat(data[i]["produto_valor"])
                var percentual = parseInt(data[i]["percentual"].replace('%', ''))
                var preco = (custo +(custo *(percentual/100))).toFixed(2)
               this.lista.push( <div  key={data[i]['id']+data[i]["produto-nome"]} className="entrada">
                        <div className="descri-2">
                            <h3>{data[i]["produto-nome"]}</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>{data[i]["quantidade"]}</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ {data[i]["produto_valor"]}</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>{data[i]["percentual"]}</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ {preco}</h3>
                        </div>
                        <div className="editar-2">
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>)
            }
            this.setState({dados: this.lista})
        }
    }
    iniciar(){
        Axios.post('index.php?url=estoque/pesquisa', {user:'1', index: 0, tamanho:15})
        .then(res => {

            if(res.data.data[1] === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.mostrar_estoque(res.data.data[1])
                if(res.data.data[3] === "Pago"){
                    this.setState({estoque_valor:res.data.data[0] })
                    this.setState({nome: res.data.data[2]})
                }
                if(res.data.data[3] === "Aberto"){
                    this.setState({mostrar_pagar: 'popup-pagar mostrar'})
                    var data = res.data.data[4].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        this.setState({estoque_valor:res.data.data[0] })
                        this.setState({dias: Math.round(dif)})
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({estoque_valor:res.data.data[0] })
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                    }
                    else{
                        if(dif<0 && dif>-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque_valor:res.data.data[0] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                        }
                        if(dif<-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque_valor:res.data.data[0] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                        }
                    }
                }
            }
        })
    }
    render(){
        return(
            <div className="tudo">
                <PopupPagar exibir={this.state.mostrar_pagar} fechar= {this.fechar_popup_pagar.bind(this)}></PopupPagar>

                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosEstoque></BlocosEstoque>
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
                                {this.state.dados}

                            </div>
                            <div className="botoes">
                                <button className="add" onClick={(event)=> this.abrir_popup()}>Adicionar</button>
                                <button className="del">Excluir</button>
                            </div>
                        </div>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

