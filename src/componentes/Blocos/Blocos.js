import React from "react";
import { useEffect, useState } from "react";
import "./Blocos.css";
import Relogio from "../Relogio/Relogio";

function Blocos(props){
    const [caixa, setcaixa] = useState(0)
    const [estoque, setestoque] = useState(0)
    const [numero_estoque, setnumero_estoque] = useState(0)
    useEffect(() => {
        setestoque(props.estoque)
        setnumero_estoque(props.numero_estoque)
        setcaixa(props.caixa)
    })
    return(
        <div className="blocos">
            <div className="box">
                <h2 className="titulo">R$ {caixa}</h2>
                <h1>Caixa</h1>
            </div>
            <div className="box">
                <h2 className="titulo">{numero_estoque}</h2>
                <h1>N° de roupas</h1>
            </div>
            <div className="box">
                <h2 className="titulo">R$ {estoque}</h2>
                <h1>Estoque</h1>
            </div>
            <Relogio></Relogio>
        </div>
    )
}
export default Blocos