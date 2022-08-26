import React, { useState } from "react";
import Rout from "./routes";
import PopupDespesas from "./componentes/PopupDespesas/PopupDespesas";
import PopupEstoque from "./componentes/PopupEstoque/PopupEstoque";
import PopupImagem from "./componentes/PopupImagem/PopupImagem";
import PopupPagar from "./componentes/PopupPagar/PopupPagar";
import PopupPrazo from "./componentes/PopupPrazo/PopupPrazo";
import PopupVencido from "./componentes/PopupVencido/PopupVencido";
import PopupVenda from "./componentes/PopupVenda/PopupVenda";
import { Authcontext } from "./componentes/Store/Context";

function App(){

    const {pp_despesa, setpp_despesa} = React.useContext(Authcontext)
    const {pp_estoque, setpp_estoque} = React.useContext(Authcontext)
    const {pp_imagem, setpp_imagem} = React.useContext(Authcontext)
    const {pp_pagar, setpp_pagar} = React.useContext(Authcontext)
    const {pp_prazo, setpp_prazo} = React.useContext(Authcontext)
    const {pp_vencido, setpp_vencido} = React.useContext(Authcontext)
    const {pp_venda, setpp_venda} = React.useContext(Authcontext)

    return(
        <div>
            <PopupDespesas exibir={pp_despesa}></PopupDespesas>
            <PopupEstoque exibir={pp_estoque}></PopupEstoque>
            <PopupImagem exibir={pp_imagem}></PopupImagem>
            <PopupPagar exibir={pp_pagar}></PopupPagar>
            <PopupPrazo exibir={pp_prazo}></PopupPrazo>
            <PopupVencido exibir={pp_vencido}></PopupVencido>
            <PopupVenda exibir={pp_venda}></PopupVenda>
            <Rout />
        </div>
    )
} 
export default App;
