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
            setsituacao("user "+props.vencimento.toString())
            setdias("Faltam "+props.dias+ " dias")
        }
        if(vencimento === 'vencido'){
            if(props.dias< -5){
                setsituacao("user "+props.vencimento.toString())
                setdias("VENCEU")    
            }
            else{
                setsituacao("user "+props.vencimento.toString())
                setdias(props.dias.toString()+ " DIAS PARA PAGAR")    
            }
        }
    }, [props.nome, props.vencimento, props.dias, vencimento])
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
                        <Link className="li" to="/"><div className="home" ></div>Home</Link>
                        <Link className="li" to="/caixa"><div className="caixa" ></div>Caixa</Link>
                        <Link className="li" to="/estoque"><div className="produtos" ></div>Produtos</Link>
                        <Link className="li" to="/financeiro"><div className="vendas" ></div>Financeiro</Link>
                    </ul>
            </div>)
}
export default Lateral