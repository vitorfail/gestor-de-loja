import React from "react"
import { useState } from "react";
import "./CaixaMostra.css";
import PopupVenda from "../PopupVenda/PopupVenda";

function CaixaMostra(){
    const [mostrar_venda, setmostrar_venda] = useState('popup-venda');

    const fechar_popup_venda = () => {
        setmostrar_venda('popup-venda')
    }
    return(
        <div className="mostrar-caixa">
            <PopupVenda exibir={mostrar_venda} fechar={fechar_popup_venda}></PopupVenda>
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
                <button className="add" onClick={(event) => setmostrar_venda('popup-venda mostrar')}>Adicionar</button>
                <button className="del">Excluir</button>
            </div>
        </div>
    )
}
export default CaixaMostra