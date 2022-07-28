import React, { Component } from "react";
import "./Estoque.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import BlocosEstoque from "../../componentes/BlocosEstoque/BlocosEstoque";
import EstoqueMostrar from "../../componentes/EstoqueMostrar/EstoqueMostrar";
export default class Estoque extends Component{
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
                        <BlocosEstoque></BlocosEstoque>
                        <EstoqueMostrar></EstoqueMostrar>
                    </Conteudo>
                    
                </LadoDireito>
            </div>
        )
    }
}

