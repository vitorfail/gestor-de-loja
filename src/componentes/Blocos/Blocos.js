import React from "react";
import "./Blocos.css";

function Blocos(){
    return(
        <div className="blocos">
            <div className="box">
                <h2 className="titulo">R$ 3.456.908,00</h2>
                <h1>Caixa</h1>
            </div>
            <div className="box">
                <h2 className="titulo">R$ 970,089</h2>
                <h1>N° de roupas</h1>
            </div>
            <div className="box">
                <h2 className="titulo">R$ 78.890,00</h2>
                <h1>Estoque</h1>
            </div>
            <div className="box-hora">
                <h2 className="titulo">12:00</h2>
                <h1>12, Maio, 2020</h1>
            </div>
        </div>
    )
}
export default Blocos