import React, { useEffect, useState } from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
function Lateral(props){
    const [nome, setnome] = useState('')
    const [dias, setdias] = useState('')
    const [vencimento, setvencimento] = useState('')
    const [situacao, setsituacao] = useState('user')
    useEffect(() => {
        setdias(props.dias)
        setnome(props.nome)
        setvencimento(props.vencimento)
        if(vencimento ===''){
            setsituacao("user")
        }
        else{
            setsituacao("user"+" "+props.vencimento)
        }

    })
    return(<div className="barralateral">
                    <div className={situacao}> 
                        <div className="icon_user">
                        </div>
                        <h3>{nome}</h3>
                        <h3>{dias}</h3>
                    </div>
                    <ul>
                        <Link className="li" to="/home">Home</Link>
                        <Link className="li" to="/caixa">Caixa</Link>
                        <Link className="li" to="/estoque">Produtos</Link>
                        <Link className="li" to="/caixa">Contas</Link>
                    </ul>
                </div>)
}
export default Lateral