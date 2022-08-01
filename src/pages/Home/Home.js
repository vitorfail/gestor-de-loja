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

export default class Home extends Component{
    constructor(){
        super()

        this.iniciar= this.iniciar.bind(this)
    }
    componentDidMount(){
        this.iniciar()
    }        
    iniciar(){
        Axios.post('index.php?url=home/pesquisa', {user:'1'})
        .then(res => {
            if(res.data.data[1] === "Usuário não autenticado"){
                Exit()
            }
            else{
                if(res.data.data[3] === "Pago"){
                    
                }
                if(res.data.data[3] === "Aberto"){
                    var data = res.data.data[4].split('-');
                    var data_vencimento = new Date(parseInt(data[2]), parseInt(data[1]), parseInt(data[0]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0){

                    }
                    else{
                        if(dif<0 && dif>-5){

                        }
                        if(dif<-5){
                            
                        }
                    }
                }
            }
        })
    }
    render(){
        return(
            <div className="tudo">
                <Lateral></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <Blocos></Blocos>
                        <Faturamento></Faturamento>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

