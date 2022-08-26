
import "./PopupImagem.css";
import React, {Component, useEffect, useState} from "react";
import Axios from "../../Axios";
import Exit from "../../Exit";
import { Authcontext } from "../Store/Context";

function PopupImagem(){
    const [mostrar, setmostrar] = useState('')
    const [preencha, setpreencha] = useState('')
    const {pp_imagem, setpp_imagem} = React.useContext(Authcontext)

    useEffect(() => {
        setpreencha({preencha: "preencha"}) 
    }, [setpreencha])
    return(
        <div className={pp_imagem}>
            <div className="menu">
                <div className="inputs">
                    <div className="titulo">
                        <h1>VENDA</h1>
                        <h3 className={preencha}>Preencha os dados*</h3>
                    </div>
                    <div className="input">
                    </div>
                </div>
                <div className="botoes">
                    <button className="add"  >Adicionar</button>
                    <button  className="cancel" onClick={(event) => setpp_imagem("popup-imagem")}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default PopupImagem
