import React, { useState } from "react";
import "./Chat.css"

export default function Chat(){
    const [stylemodal, setstylemodal] = useState({"height":"30px"})
    const [aparecer, setaparecer] = useState(false)
    function mostrarchat(){
        if(aparecer === false){
            setstylemodal({"height":"300px"})
            setaparecer(true)
        }
        else{
            setstylemodal({"height":"30px"})
            setaparecer(false)
        }
    }
    return(
        <div style={stylemodal} className="chat">
            <h3  onClick={() => mostrarchat()}>Mensagens</h3>
            <div  className="conteudo-chat">

            </div>
        </div>
    )
}