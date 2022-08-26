import "./Check.css";
import React, { useEffect, useState} from "react";
import Axios from "../../Axios.js";
import {  useParams } from "react-router-dom";
function Check(){
    const code = useParams()
    const [link, setlink]= useState('')
    
    useEffect(() =>{
        function testarcode(){
            Axios.post('/index.php?url=checkcode/pesquisa', {code:code['code']}).then(res => {
                if(res.data.data === '1'){
                    setlink("http://localhost:3000/");
                }
            })
        }
        testarcode()
    }, [code])

    return(
        <div className="check-back">
            <div className="check">
                <div className="titulo">
                    <h2>Aguarde</h2>
                </div>
                <p>Aguarde um pouco. Seu pagamento foi efetuado em breve o 
                    enviaremos de volta a sua página inicial</p>
                    <a href={link}>Voltar para o site</a>
            </div>
        </div>
    )
   
}
export default Check;
