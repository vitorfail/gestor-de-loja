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
        this.dados = [];
        this.state = {
            caixa:0,
            estoque: '',
            dias: '',
            nome:'',
            numero_estoque:0,
            vencimento:'',
            faturamento:0,
            despesas:0,
            mostrar_pagar:"popup-pagar",
            mostrar_vencido:"popup-vencido",
            mostrar_prazo: "popup-prazo",
            tipos_de_pagamento:0,
            isLoading:true,
            seminternet:"sem-internet",
            ano: '',
            s:0,
            saldo:0
        }
        this.criar_avisos = this.criar_avisos.bind(this)
        this.formatar_data = this.formatar_data.bind(this) 
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
    formatar_data(data){
        var list= data.split('-')
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril","Maio",
        "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        data = list[2]+', de '+meses[(parseInt(list[1])-1)]+', '+list[0]
        return data
    }
    criar_avisos(dados){
        this.dados = [];
        if(dados.produto_mais_vendido !==0){
            if(dados.produto_mais_vendido.produto_nome !== 0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O produto mais vendido é <strong>{dados.produto_mais_vendido.produto_nome}</strong>. 
                                    Vendendo ao todo <strong>{dados.produto_mais_vendido.quantidade}</strong> peças</p>
                                </div>)
            }
        }
        if(dados.produto_menos_vendido !==0){
            if(dados.produto_menos_vendido.produto_nome !== 0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>Os produtos menos vendidos são <strong>{dados.produto_menos_vendido.produto_nome[0]}</strong>,
                                    <strong>{dados.produto_menos_vendido.produto_nome[1]}</strong>, 
                                    <strong>{dados.produto_menos_vendido.produto_nome[2]}</strong>,
                                    <strong>{dados.produto_menos_vendido.produto_nome[3]}</strong>, 
                                    <strong>{dados.produto_menos_vendido.produto_nome[4]}</strong>. 
                                    Vendendo ao todo <strong>{dados.produto_menos_vendido.Qtd[0]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[1]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[2]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[3]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[4]}</strong> peças</p>
                                </div>)
            }
        }
        if(dados.maior_venda !==0){
            if(dados.maior_venda.Qtd > 1){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O produtivo vendido pelo maior preço 
                                        foi <strong>{dados.maior_venda.produto_nome}</strong>. 
                                        Foram <strong>{dados.maior_venda.Qtd}</strong> peças cada uma vendida
                                         por <strong>R$ {dados.maior_venda.valor}</strong>. No dia <strong>{this.formatar_data(dados.maior_venda.data)}</strong> </p>
                                </div>)
            }
            else{
                this.dados.push(<div key={Math.random()} className="info">
                <p>O produtivo vendido pelo maior preço 
                    foi <strong>{dados.maior_venda.produto_nome}</strong>. 
                    Foi <strong>uma</strong> peça vendida
                     por <strong>R$ {dados.maior_venda.valor}</strong>. No dia <strong>{this.formatar_data(dados.maior_venda.data)}</strong> </p>
                </div>)
            }
        }
        if(dados.melhor_dia !==0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O dia com mais vendas foi em <strong>{this.formatar_data(dados.melhor_dia.data)}</strong>. O dia fechou 
                                    com <strong>{dados.melhor_dia.Qtd}</strong> vendas</p>
                                </div>)
        }
        if(dados.maior_despesa !==0){
            this.dados.push(<div key={Math.random()} className="info">
                                <p>A maior dívida paga foi a de <strong>{dados.maior_despesa.descricao}</strong> de <strong>R$ {dados.maior_despesa.valor}</strong> no
                                 dia <strong>{this.formatar_data(dados.maior_despesa.data)}</strong></p>
                            </div>)
        }
    }
    componentDidMount(){
        var data = new Date()

        this.setState({ano: data.getFullYear()})

        this.iniciar(String(data.getFullYear()))
        setTimeout(() =>  this.setState({isLoading: false}), 3);
    }
    iniciar(ano_){
        Axios.post('index.php?url=financeiro/pesquisa', {user:'1', ano:ano_})
        .then(res => {
            var dados = res.data.data
            if(dados['recebido'] === null){
                this.setState({caixa:0})
            }
            else{
                this.setState({caixa: dados['recebido']})
            }
            if(dados['situacao'] === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.criar_avisos(dados['notificacao'])
                this.setState({nome: dados['nome']})
                this.setState({faturamento: dados['recebido']})
                this.setState({despesas: dados['despesas']})
                this.setState({saldo: dados['recebido']- dados['despesas']})
                if(dados['recebido']- dados['despesas'] <0){
                    this.setState({s: 'box negativo'})
                }
                else{
                    this.setState({s: 'box saldo'})
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
            console.log(er)
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
                            <h2 className="despesas">R$ {this.state.despesas}</h2>
                            <h1 >Despesas  em {this.state.ano}</h1>
                        </div>
                        <div className={this.state.s}>
                            <h2 className="saldo">R$ {0}</h2>
                            <h1>Saldo {this.state.ano}</h1>
                        </div>
                        <Relogio></Relogio>
                        <div className="notific">
                            {this.dados}
                        </div>
                    </div>
                </LadoDireito>
            </div>
        )
    }
}

