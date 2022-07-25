import React from "react";
import { useEffect, useState } from "react";
import "./Blocos.css";

function Blocos(){
    const [datas, setdatas] = useState(0)
    const [hora, sethora] = useState(0)
    const [minutos, setminutos] = useState(0)
    useEffect(() => {
        var data = new Date;
        var dia = data.getDate()
        var mes = data.getMonth()
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril","Maio",
         "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        if(dia< 10) dia = "0"+dia
        setdatas(dia+ ", "+meses[data.getMonth()+1]+ ", "+data.getFullYear())
        sethora(data.getHours())
        setminutos(data.getMinutes())
    })
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
                <h2 className="titulo">{hora}:{minutos}</h2>
                <h1>{datas}</h1>
            </div>
        </div>
    )
}
export default Blocos