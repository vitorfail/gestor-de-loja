import React, { Component } from "react";
import "./Home.css"; 
import Lateral from "../../componentes/Lateral/Lateral"
import Conteudo from "../../componentes/Conteudo/Conteudo";
export default class Home extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="tudo">
                <Lateral></Lateral>
            </div>
        )
    }
}

