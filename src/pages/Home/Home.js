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
import Loading from "../../componentes/Loading/Loading";
import { Authcontext } from "../../componentes/Store/Context";

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            caixa:0,
            estoque: '',
            dias: '',
            nome:'',
            numero_estoque:0,
            vencimento:'',
            faturamento:0,
            tipos_de_pagamento:0,
            isLoading:true,
        }
        this.iniciar= this.iniciar.bind(this)
    }
    static contextType = Authcontext


    componentDidMount(){
        this.iniciar()
        setTimeout(() =>  this.setState({isLoading: false}), 3);
    }
    iniciar(){
        const {setpp_pagar, setpp_prazo, setpp_vencido, setsem_internet} = this.context
        Axios.post('index.php?url=home/pesquisa', {user:'1'})
        .then(res => {
            var dados = res.data.data
            if(dados['valor_caixa'] === null){
                this.setState({caixa:0})
            }
            else{
                this.setState({caixa: dados['valor_caixa']})
            }
            if(dados['valor_estoque'] === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.setState({estoque:dados['valor_estoque'].toFixed(2)})
                this.setState({nome: dados['nome']})
                this.setState({numero_estoque: dados['numero_roupas']})
                this.setState({faturamento: dados['faturamento']})
                this.setState({tipos_de_pagamento: dados['tipos_de_pagamento']})
                if(dados['situacao'] === "Aberto"){
                    var data = dados['data_vencimento'].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        setpp_prazo("popup-prazo mostrar")
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    else{
                        if(dif<0 && dif>-5){
                            setpp_pagar('popup-pagar mostrar')
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                        if(dif<-5){
                            setpp_vencido("popup-vencido mostrar")
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                    }
                }
            }
        }).catch( er => {
            setsem_internet("sem-internet mostrar")
        })
    }
    render(){
        return(this.state.isLoading? <Loading></Loading> :
            <div className="tudo">
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <Blocos caixa={this.state.caixa.toFixed(2)} estoque={this.state.estoque} numero_estoque={this.state.numero_estoque}></Blocos>
                        <Faturamento faturamento_mes={this.state.faturamento} tipos_de_pagamento={this.state.tipos_de_pagamento}></Faturamento>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

