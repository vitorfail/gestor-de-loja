import React from "react";
import "./BlocosCaixa.css";
import { useState, useEffect } from "react";
import Relogio from "../Relogio/Relogio";
function BlocosCaixa(props){
    const [receita, setreceita] = useState(890);
    const [despesas, setdespesas] = useState(45680)
    useEffect(() => {


    })

    return(
        <div className="blocos-caixa">
            <div className="box">
                <h2 className="receita">R$ {props.recebido_hoje}</h2>
                <h1 >Recebido Hoje</h1>
            </div>
            <div className="box">
                <h2 className="despesas">R$ {props.despesas}</h2>
                <h1 >Despesas</h1>
            </div>
            <Relogio></Relogio>
        </div>
    )
}
export default BlocosCaixa