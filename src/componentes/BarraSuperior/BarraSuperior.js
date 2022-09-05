import React from "react";
import "./BarraSuperior.css";
import { Authcontext } from "../Store/Context";

function BarraSuperior(){
    const {setpp_calculadora} = React.useContext(Authcontext)
    return(
        <div className="barra_superior">
            <button onClick={() => setpp_calculadora('popup-calculadora mostrar')} className="calculadora-normal">Calculadora</button>
            <button className="calculadora-rh">Calculadora Rh</button>
        </div>
    )
}
export default BarraSuperior;