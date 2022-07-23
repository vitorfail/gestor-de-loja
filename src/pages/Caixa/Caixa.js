import React, { Component } from "react";
import "./Caixa.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Blocos from "../../componentes/Blocos/Blocos";
import Faturamento from "../../componentes/Faturamento/Faturamento";
import CaixaMostra from "../../componentes/CaixaMostra/CaixaMostra";
import BlocosCaixa from "../../componentes/BlocosCaixa/BlocosCaixa";

export default class Caixa extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="tudo">
                <Lateral></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosCaixa></BlocosCaixa>
                        <CaixaMostra></CaixaMostra>      
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

