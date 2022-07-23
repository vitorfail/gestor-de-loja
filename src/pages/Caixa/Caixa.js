import React, { Component } from "react";
import "./Caixa.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Blocos from "../../componentes/Blocos/Blocos";
import Faturamento from "../../componentes/Faturamento/Faturamento";

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
                        <Blocos></Blocos>
                        <Faturamento></Faturamento>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

