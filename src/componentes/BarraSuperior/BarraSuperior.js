import React from "react";
import "./BarraSuperior.css";

function BarraSuperior(){
    const {setpp_calculadora} = React.useContext()
    return(
        <div className="barra_superior">
            <button onClick={() => setpp_calculadora('popup-calculadora mostrar')} className="calculadora-normal">Calculadora</button>
            <button className="calculadora-rh">Calculadora Rh</button>
        </div>
    )
}
export default BarraSuperior;