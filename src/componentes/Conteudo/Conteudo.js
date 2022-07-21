import React from "react";
import "./Conteudo.css"

function Conteudo(props){
    return(
        <div className="conteudo">
            {props.children}
        </div>
    )
}
export default Conteudo;