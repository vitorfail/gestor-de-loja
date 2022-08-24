import React, { Component } from "react";
import "./Financeiro.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Axios from "../../Axios.js";
import Exit from "../../Exit";
import PopupPagar from "../../componentes/PopupPagar/PopupPagar";
import PopupPrazo from "../../componentes/PopupPrazo/PopupPrazo";
import PopupVencido from "../../componentes/PopupVencido/PopupVencido";
import Loading from "../../componentes/Loading/Loading";
import SemInternet from "../../componentes/SemInternet/SemInternet";
import Relogio from "../../componentes/Relogio/Relogio";

export default class Financeiro extends Component{
    constructor(){
        super()
        this.state = {
            caixa:0,
            estoque: '',
            dias: '',
            nome:'',
            numero_estoque:0,
            vencimento:'',
            faturamento:0,
            mostrar_pagar:"popup-pagar",
            mostrar_vencido:"popup-vencido",
            mostrar_prazo: "popup-prazo",
            tipos_de_pagamento:0,
            isLoading:true,
            seminternet:"sem-internet",
            ano: '',
            s:0
        }
        this.fechar_popup_pagar = this.fechar_popup_pagar.bind(this)
        this.iniciar= this.iniciar.bind(this)
    }
    fechar_popup_pagar(){
        this.setState({mostrar_pagar: "popup-pagar"})
    } 
    fechar_popup_prazo(){
        this.setState({mostrar_prazo: "popup-prazo"})
    }
    fechar_popup_vencido(){
        this.setState({mostrar_vencido: "popup-vencido"})
    }
    componentDidMount(){
        var data = new Date()

        this.setState({ano: data.getFullYear()})

        this.iniciar(String(data.getFullYear()))
        setTimeout(() =>  this.setState({isLoading: false}), 3);
    }
    iniciar(ano_){
        Axios.post('index.php?url=home/financeiro', {user:'1', ano:ano_})
        .then(res => {
            if(res.data.data[5] === null){
                this.setState({caixa:0})
            }
            else{
                this.setState({caixa: res.data.data[5]})
            }
            if(res.data.data[1] === "Usuário não autenticado"){
                Exit()
            }
            else{
                var dados = res.data.data
                this.setState({nome: dados['nome']})
                this.setState({faturamento: dados['caixa']})

                if(res.data.data[3] === "Pago"){
                }
                if(res.data.data[3] === "Aberto"){
                    var data = dados['data_vencimento'].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        this.setState({mostrar_prazo: "popup-prazo mostrar"})
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    else{
                        if(dif<0 && dif>-5){
                            this.setState({mostrar_pagar: 'popup-pagar mostrar'})
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                        if(dif<-5){
                            this.setState({mostrar_vencido:"popup-vencido mostrar"})
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                    }
                }
            }
        }).catch( er => {
            this.setState({seminternet: "sem-internet mostrar"})
        })
    }
    render(){
        return(this.state.isLoading? <Loading></Loading> :
            <div className="tudo">
                <SemInternet exibir={this.state.seminternet}></SemInternet>
                <PopupVencido exibir={this.state.mostrar_vencido} fechar= {this.fechar_popup_vencido.bind(this)}></PopupVencido>
                <PopupPrazo exibir={this.state.mostrar_prazo} fechar= {this.fechar_popup_prazo.bind(this)}></PopupPrazo>
                <PopupPagar exibir={this.state.mostrar_pagar} fechar= {this.fechar_popup_pagar.bind(this)}></PopupPagar>
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <div className="blocos-financeiro">
                        <div className="box">
                            <h2 className="receita">R$ {this.state.faturamento}</h2>
                            <h1>Recebido em {this.state.ano}</h1>
                        </div>
                        <div className="box">
                            <h2 className="despesas">R$ {0}</h2>
                            <h1 >Despesas  em {this.state.ano}</h1>
                        </div>
                        <div className={this.state.s}>
                            <h2 className="saldo">R$ {0}</h2>
                            <h1>Saldo {this.state.ano}</h1>
                        </div>
                        <div>
                            <div>
                                
                            </div>
                        </div>
                        <Relogio></Relogio>
                    </div>
                </LadoDireito>
            </div>
        )
    }
}

