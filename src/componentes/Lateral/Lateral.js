import React, { useEffect, useState } from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
function Lateral(props){
    const [nome, setnome] = useState('')
    const [dias, setdias] = useState('')
    const [vencimento, setvencimento] = useState('')
    const [situacao, setsituacao] = useState('user')
    useEffect(() => {
        setnome(props.nome)
        setvencimento(props.vencimento)
        if(vencimento ===''){
            setsituacao("user")
        }
        if(vencimento === 'prazo'){
            setsituacao("user"+" "+props.vencimento)
            setdias("Faltam "+props.dias+ " dias")
        }
        if(vencimento === 'vencido'){
            setsituacao("user"+" "+props.vencimento)
            setdias(props.dias+ " DIAS PARA PAGAR")
        }
    })
    return(<div className="barralateral">
                    <div className={situacao}> 
                        <div className="info">
                            <div className="icon_user">
                            </div>
                            <h3>{nome}</h3>
                        </div>
                        <div className="aviso">
                            <h3 className="situacao">{dias}</h3>
                        </div>
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