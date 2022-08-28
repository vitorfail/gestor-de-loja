import React, { useEffect, useState } from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
import { Authcontext } from "../Store/Context";
import Exit from "../../Exit";
import { useHistory } from "react-router-dom";
function Lateral(props){
    const {setpp_imagem} = React.useContext(Authcontext)
    const {urlimage} =React.useContext(Authcontext)
    const [imagem, setimagem] = useState(null)
    const [nome, setnome] = useState('')
    const [dias, setdias] = useState('')
    const [vencimento, setvencimento] = useState('')
    const [situacao, setsituacao] = useState('user')
    const history = useHistory()
    const mudar_imagine = () => {
        setpp_imagem("popup-imagem mostrar")
    }
    const sair = () =>{
        Exit()
        history.push('/login')
    }
    useEffect(() => {
        setnome(props.nome)
        setvencimento(props.vencimento)
        if(urlimage !== ''){
            setimagem(<img alt="perfil" src={urlimage}/>)
        }
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
    }, [props.nome, props.vencimento, props.dias, vencimento, urlimage])


    return(<div className="barralateral">
                    <div className={situacao}> 
                        <div className="info">
                            <div className="icon_user" onClick={(event) => mudar_imagine()}>
                                {imagem}
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
                        <div className="li" onClick={() => sair()}><div className="sair" ></div>Sair</div>
                    </ul>
            </div>)
}
export default Lateral