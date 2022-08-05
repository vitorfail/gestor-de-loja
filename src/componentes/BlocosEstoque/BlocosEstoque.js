import React from "react";
import "./BlocosEstoque.css";
import { useState, useEffect } from "react";
import Relogio from "../Relogio/Relogio";

function BlocosEstoque(){
    const [estoque, setestoque] = useState(890);
    useEffect(() => {
    })

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