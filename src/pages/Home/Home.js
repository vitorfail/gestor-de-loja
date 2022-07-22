import React, { Component } from "react";
import "./Home.css"; 
import Lateral from "../../componentes/Lateral/Lateral"
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Blocos from "../../componentes/Blocos/Blocos";
import Faturamento from "../../componentes/Faturamento/Faturamento";
export default class Home extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="tudo">
                <Lateral></Lateral>
                <Conteudo>
                    <BarraSuperior></BarraSuperior>
                    <Blocos></Blocos>
                    <Faturamento></Faturamento>
                </Conteudo>
            </div>
        )
    }
}

