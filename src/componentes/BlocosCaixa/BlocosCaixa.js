import React from "react";
import "./BlocosCaixa.css";

function BlocosCaixa(){
    return(
        <div className="blocos-caixa">
            <div className="box">
                <h2 className="receita">R$ 3.456.908,00</h2>
                <h1 >Recebido Hoje</h1>
            </div>
            <div className="box">
                <h2 className="despesas">R$ 970,089</h2>
                <h1 >Despesas</h1>
            </div>
            <div className="box-hora">
                <h2 className="titulo">12:00</h2>
                <h1>12, Maio, 2020</h1>
            </div>
        </div>
    )
}
export default BlocosCaixa