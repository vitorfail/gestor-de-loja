import React, { useEffect, useState } from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
function Lateral(props){
    const [nome, setnome] = useState('')
    const [dias, setdias] = useState('')
    const [vencimento, setvencimento] = useState('')
    const [situacao, setsituacao] = useState('user')
    const [publickey, setpublickey] = useState('')
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
            setsituacao("user "+props.vencimento.toString())
            setdias(props.dias.toString()+ " DIAS PARA PAGAR")
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
                        <Link className="li" to="/">Home</Link>
                        <Link className="li" to="/caixa">Caixa</Link>
                        <Link className="li" to="/estoque">Produtos</Link>
                        <Link className="li" to="/caixa">Contas</Link>
                    </ul>
                    <form  className='pagar' action="mercadopago/processapagamentomp.php" method="POST">
                        <script
                            src="https://www.mercadopago.com.br/integrations/v1/web-tokenize-checkout.js"
                            data-public-key={publickey}				
                            data-button-label="Pagar assinatura"
                            data-transaction-amount="100.00"
                            data-summary-product-label="Assinatura">
                        </script>
                    </form>
            </div>)
}
export default Lateral