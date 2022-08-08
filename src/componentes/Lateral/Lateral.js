import React, { useEffect, useState } from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
import Axios from '../../Axios'
function Lateral(props){
    const [nome, setnome] = useState('')
    const [dias, setdias] = useState('')
    const [vencimento, setvencimento] = useState('')
    const [situacao, setsituacao] = useState('user')
    const [pagar, sepagar] =useState(null)

    useEffect(() => {
        setnome(props.nome)
        setvencimento(props.vencimento)
        if(vencimento ===''){
            setsituacao("user")
        }
        if(vencimento === 'prazo'){
            Pagamento()
            setsituacao("user "+props.vencimento.toString())
            setdias("Faltam "+props.dias+ " dias")
        }
        if(vencimento === 'vencido'){
            if(props.dias< -5){
                Pagamento()
                setsituacao("user "+props.vencimento.toString())
                setdias("VENCEU")    
            }
            else{
                Pagamento()
                setsituacao("user "+props.vencimento.toString())
                setdias(props.dias.toString()+ " DIAS PARA PAGAR")    
            }
        }
    }, [props.nome, props.vencimento, props.dias, vencimento])
    function Pagamento(){
        Axios.post('processarpagamento.php').then(res => {
            sepagar(res.data)
        })
    }
    return(<div className="barralateral">
                    <div className={situacao}> 
                        <div className="link">
                            <a href={pagar}  rel="noreferrer"  target="_blank">PAGAR</a>
                        </div>
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
                        <Link className="li" to="/">Home</Link>
                        <Link className="li" to="/caixa">Caixa</Link>
                        <Link className="li" to="/estoque">Produtos</Link>
                        <Link className="li" to="/caixa">Contas</Link>
                    </ul>
            </div>)
}
export default Lateral