import React from "react";
import "./BlocosCaixa.css";
import { useState, useEffect } from "react";
import Relogio from "../Relogio/Relogio";
function BlocosCaixa(props){
    const [receita, setreceita] = useState(890);
    const [despesas, setdespesas] = useState(45680)
    const [s, sets] = useState(0)
    const [mes, setmes] = useState('')
    useEffect(() => {
        setreceita(props.caixa)
        setdespesas(props.despesas)
        if(props.caixa <0){
            sets('box negativo')
        }
        else{
            sets('box saldo')
        }
        var data = new Date()
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril","Maio",
        "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        setmes(meses[data.getMonth()])
    }, [props.caixa, props.despesas, receita, despesas, mes])

    return(
        <div className="blocos-caixa">
            <div className="box">
                <h2 className="receita">R$ {props.recebido}</h2>
                <h1>Recebido esse mês</h1>
            </div>
            <div className="box">
                <h2 className="despesas">R$ {props.despesas}</h2>
                <h1 >Despesas</h1>
            </div>
            <div className={s}>
                <h2 className="saldo">R$ {props.caixa}</h2>
                <h1>Saldo {mes}</h1>
            </div>
            <Relogio></Relogio>
        </div>
    )
}
export default BlocosCaixa