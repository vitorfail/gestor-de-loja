import React, { useState } from "react";

export const Authcontext = React.createContext({}); 
export const StoreContext = (props) =>{
    const [pp_despesa, setpp_despesa,] = useState('popup-despesa')
    const [pp_estoque, setpp_estoque,] = useState('popup-estoque')
    const [pp_imagem, setpp_imagem,] = useState('popup-imagem')
    const [pp_pagar, setpp_pagar,] = useState('popup-pagar')
    const [pp_prazo, setpp_prazo,] = useState('popup-prazo')
    const [pp_vencido, setpp_vencido,] = useState('popup-vencido')
    const [pp_venda, setpp_venda,] = useState('popup-venda')
    return(
        <Authcontext.Provider value={{pp_despesa, setpp_despesa, 
            pp_estoque, setpp_estoque, pp_imagem, setpp_imagem, 
            pp_pagar, setpp_pagar, pp_prazo, setpp_prazo,
             pp_vencido, setpp_vencido, pp_venda, setpp_venda}}>
            {props.children}
        </Authcontext.Provider>
    )
}