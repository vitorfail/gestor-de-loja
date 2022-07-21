import React, { Component } from "react";
import Barra from "../../componentes/Barra/Barra";
import Lateral from "../../componentes/Lateral/Lateral"
export default class Home extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Barra></Barra>
                <div>
                    <Lateral></Lateral>
                </div>
            </div>
        )
    }
}

