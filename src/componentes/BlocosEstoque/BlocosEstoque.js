import React from "react";
import "./BlocosEstoque.css";
import { useState, useEffect } from "react";
import Relogio from "../Relogio/Relogio";

function BlocosEstoque(props){
    const [estoque, setestoque] = useState(props.estoque);
    useEffect(() => {
        setestoque(props.estoque)
    }, [props.estoque])

    return(
        <div className="blocos-estoque">
            <div className="box">
                <h2 className="receita">R$ {estoque}</h2>
                <h1 >Em estoque</h1>
            </div>
            <Relogio></Relogio>
        </div>
    )
}
export default BlocosEstoque