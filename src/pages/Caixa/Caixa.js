import React, { Component } from "react";
import "./Caixa.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import CaixaMostra from "../../componentes/CaixaMostra/CaixaMostra";
import BlocosCaixa from "../../componentes/BlocosCaixa/BlocosCaixa";
import Exit from '../../Exit'
import Axios from "../../Axios"
import PopupPagar from "../../componentes/PopupPagar/PopupPagar";
import PopupPrazo from "../../componentes/PopupPrazo/PopupPrazo";
import PopupVencido from "../../componentes/PopupVencido/PopupVencido";
import Loading from "../../componentes/Loading/Loading";

export default class Caixa extends Component{
    constructor(){
        super()
        this.state = {
            caixa:0,
            recebido_hoje: '',
            dias: '',
            nome:'',
            despesas:0,
            vencimento:'',
            mostrar_pagar:"popup-pagar",
            mostrar_vencido:"popup-vencido",
            mostrar_prazo: "popup-prazo",
            isLoading: true
        }
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
        this.iniciar()
    }        
    iniciar(){
        Axios.post('index.php?url=caixa/pesquisa', {user:'1'})
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
                if(res.data.data[3] === "Pago"){
                    this.setState({recebido_hoje:res.data.data[1] })
                    this.setState({nome: res.data.data[2]})
                    this.setState({despesas: res.data.data[0]})
                }
                if(res.data.data[3] === "Aberto"){
                    var data = res.data.data[4].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        this.setState({mostrar_prazo:'popup-prazo mostrar'})
                        this.setState({recebido_hoje:res.data.data[1] })
                        this.setState({dias: Math.round(dif)})
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                        this.setState({despesas: res.data.data[0]})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({recebido_hoje:res.data.data[1] })
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                        this.setState({despesas: res.data.data[0]})    
                    }
                    else{
                        if(dif<0 && dif>-5){
                            this.setState({mostrar_pagar:'popup-pagar mostrar'})
                            this.setState({dias: Math.round(dif)})
                            this.setState({recebido_hoje:res.data.data[1] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                            this.setState({despesas: res.data.data[0]})        
                        }
                        if(dif<-5){
                            this.setState({mostrar_vencido:"popup-vencido mostrar"})
                            this.setState({dias: Math.round(dif)})
                            this.setState({recebido_hoje:res.data.data[1] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                            this.setState({despesas: res.data.data[0]})        
                        }
                    }
                }
            }
            this.setState({isLoading:false})

        })
    }
    render(){
        return(this.state.isLoading? <Loading></Loading>:
            <div className="tudo">
                <PopupVencido exibir={this.state.mostrar_vencido} fechar= {this.fechar_popup_vencido.bind(this)}></PopupVencido>
                <PopupPrazo exibir={this.state.mostrar_prazo} fechar= {this.fechar_popup_prazo.bind(this)}></PopupPrazo>
                <PopupPagar exibir={this.state.mostrar_pagar} fechar= {this.fechar_popup_pagar.bind(this)}></PopupPagar>
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosCaixa despesas={this.state.despesas} recebido_hoje={this.state.recebido_hoje}></BlocosCaixa>
                        <CaixaMostra></CaixaMostra>      
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

