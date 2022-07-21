import React, { Component } from "react";
import Barra from "../../componentes/Barra/Barra";
import Lateral from "../../componentes/Lateral/Lateral"
import Conteudo from "../../componentes/Conteudo/Conteudo";
export default class Home extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Barra></Barra>
                <Conteudo >
                    <Lateral></Lateral>
                </Conteudo>
            </div>
        )
    }
}

