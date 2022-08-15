import React from "react"
import { useState } from "react";
import "./CaixaMostra.css";
import PopupVenda from "../PopupVenda/PopupVenda";
import PopupDespesas from "../PopupDespesas/PopupDespesas";

function CaixaMostra(){
    const [mostrar_venda, setmostrar_venda] = useState('popup-venda');
    const [mostrar_despesa, setmostrar_despesa] = useState('popup-despesa');


    const fechar_popup_venda = () => {
        setmostrar_venda('popup-venda')
    }
    const fechar_popup_despesa = () =>{
        setmostrar_despesa('popup-despesa')
    }
    return(
        <div className="mostrar-caixa">
            <PopupDespesas exibir={mostrar_despesa} fechar= {fechar_popup_despesa}></PopupDespesas>
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
                <button className="add" onClick={(event) => setmostrar_venda('popup-venda mostrar')}>Adicionar venda</button>
                <button className="del" onClick={(event) => setmostrar_despesa('popup-despesa mostrar')}>Adicionar despesas</button>
            </div>
        </div>
    )
}
export default CaixaMostra