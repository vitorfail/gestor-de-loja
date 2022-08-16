import './Relogio.css'
import {useState, useEffect} from 'react';


function Relogio(){
    const [datas, setdatas] = useState(0)
    const [hora, sethora] = useState(0)
    const [minutos, setminutos] = useState(0)
    useEffect(() => {
        hora_atualizar()
        setInterval(() => hora_atualizar(), 30000);
    })
    function hora_atualizar(){
        var data = new Date()
        var dia = data.getDate()
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril","Maio",
         "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        if(dia< 10) dia = "0"+dia
        setdatas(dia+ ", "+meses[data.getMonth()]+ ", "+data.getFullYear())
        if(data.getHours() >9){
            sethora(data.getHours())
        }
        if(data.getHours() <10){
            sethora('0'+data.getHours())
        }
        if(data.getMinutes() <10){
            setminutos('0'+data.getMinutes())
        }
        if(data.getMinutes() >10 || data.getMinutes() === 10){
            setminutos(data.getMinutes())
        }

    }
    return(
        <div className="box-hora">
            <h2 className="titulo">{hora}:{minutos}</h2>
            <h1>{datas}</h1>
        </div>
    )
}
export default Relogio