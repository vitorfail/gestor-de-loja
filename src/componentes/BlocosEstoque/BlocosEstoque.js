import React from "react";
import "./BlocosEstoque.css";
import { useState, useEffect } from "react";
function BlocosEstoque(){
    const [estoque, setestoque] = useState(890);
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
        <div className="blocos-estoque">
            <div className="box">
                <h2 className="receita">R$ {estoque}</h2>
                <h1 >Em estoque</h1>
            </div>
            <div className="box-hora">
                <h2 className="titulo">{hora}:{minutos}</h2>
                <h1>{datas}</h1>
            </div>
        </div>
    )
}
export default BlocosEstoque