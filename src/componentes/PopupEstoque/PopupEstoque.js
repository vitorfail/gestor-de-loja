
import "./PopupEstoque.css";
import React, {useState} from "react";

function PopupEstoque(props){
    const [mostrar , setmostrar] = useState(props.exibir)
    return(
    <div className={mostrar}>
        <div className="menu">
            <div className="inputs">
                <div className="input">
                    <h3>Nome da peça</h3>
                    <input></input>
                </div>
                <div className="input">
                    <h3>Custo</h3>
                    <input></input>
                </div>
                <div className="input">
                    <h3>Quantidade</h3>
                    <input></input>
                </div>
            </div>
            <div className="botoes">
                <button className="add">Adicionar</button>
                <button  className="cancel"  onClick={(event)=>setmostrar("popup-estoque")} >Cancelar</button>
            </div>
        </div>
    </div>
    )

}
export default PopupEstoque