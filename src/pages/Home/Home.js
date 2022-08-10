import React, { Component } from "react";
import "./Home.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Blocos from "../../componentes/Blocos/Blocos";
import Faturamento from "../../componentes/Faturamento/Faturamento";
import Axios from "../../Axios.js";
import Exit from "../../Exit";
import PopupPagar from "../../componentes/PopupPagar/PopupPagar";

export default class Home extends Component{
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
            mostrar_pagar:"popup-pagar"
        }
        this.fechar_popup_pagar = this.fechar_popup_pagar.bind(this)
        this.iniciar= this.iniciar.bind(this)
    }
    componentDidMount(){
        this.iniciar()
    }
    fechar_popup_pagar(){
        this.setState({mostrar_pagar: "popup-pagar"})
    }        
    iniciar(){
        Axios.post('index.php?url=home/pesquisa', {user:'1'})
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
                    this.setState({estoque:res.data.data[1] })
                    this.setState({nome: res.data.data[2]})
                    this.setState({numero_estoque: res.data.data[0]})
                    this.setState({faturamento: res.data.data[6]})
                }
                if(res.data.data[3] === "Aberto"){
                    this.setState({mostrar_pagar: 'popup-pagar mostrar'})
                    var data = res.data.data[4].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        this.setState({estoque:res.data.data[1] })
                        this.setState({dias: Math.round(dif)})
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                        this.setState({numero_estoque: res.data.data[0]})
                        this.setState({faturamento: res.data.data[6]})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({estoque:res.data.data[1] })
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                        this.setState({numero_estoque: res.data.data[0]}) 
                        this.setState({faturamento: res.data.data[6]})   
                    }
                    else{
                        if(dif<0 && dif>-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque:res.data.data[1] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                            this.setState({numero_estoque: res.data.data[0]})
                            this.setState({faturamento: res.data.data[6]})        
                        }
                        if(dif<-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque:res.data.data[1] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                            this.setState({numero_estoque: res.data.data[0]})
                            this.setState({faturamento: res.data.data[6]})        
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
                        <Blocos caixa={this.state.caixa} estoque={this.state.estoque} numero_estoque={this.state.numero_estoque}></Blocos>
                        <Faturamento faturamento_mes={this.state.faturamento}></Faturamento>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

