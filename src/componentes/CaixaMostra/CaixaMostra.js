import React from "react"
import { useState } from "react";
import "./CaixaMostra.css";
import PopupDespesas from "../PopupDespesas/PopupDespesas";
import { Authcontext } from "../Store/Context";

function CaixaMostra(){
    const [mostrar_despesa, setmostrar_despesa] = useState('popup-despesa');
    const {setpp_venda} = React.useContext(Authcontext)
    return(
        <div className="mostrar-caixa">
            <PopupDespesas exibir={mostrar_despesa} fechar= {fechar_popup_despesa}></PopupDespesas>
            <div className="tabela">
                <div className="titulo">
                    <h3 className="descricao">Descrição</h3>
                    <h3>Valores</h3>
                </div>
                <div className="entrada">
                    <div className="descri">
                        <h3>Roupa</h3>
                    </div>
                    <div className="valor">
                        <h3>R$ 43,00</h3>
                    </div>
                </div>
                <div className="saida">
                    <div className="descri">
                        <h3>Papel</h3>
                    </div>
                    <div className="valor">
                        <h3>- R$ 13,00</h3>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri">
                        <h3>Roupa</h3>
                    </div>
                    <div className="valor">
                        <h3>R$ 43,00</h3>
                    </div>
                </div>
            </div>
            <div className="botoes">
                <button className="add" onClick={(event) => setpp_venda('popup-venda mostrar')}>Adicionar venda</button>
                <button className="del" onClick={(event) => setmostrar_despesa('popup-despesa mostrar')}>Adicionar despesas</button>
            </div>
        </div>
    )
}
export default CaixaMostra