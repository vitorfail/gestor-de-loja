import "./Login.css";
import "./Login.scss";
import React, { useState } from "react";
import Axios from "../../Axios.js";
import { useHistory } from "react-router-dom";
function Login(){
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [aviso, setaviso] = useState('aviso');
    const [aviso_erro, setaviso_erro] = useState('aviso_erro');
    const [aviso_net, setaviso_net] = useState('aviso_net')
    const history = useHistory();
    const [ logando, setlogando] = useState('');
    const [darespaco, setdarespaco] = useState('');

    function login(){
        if(email == ''|| senha == ''){
            setaviso("aviso")
            setTimeout(() =>  setaviso('aviso mostrar'), 4);
        }
        else{
            setdarespaco('espaco')
            setlogando('logando');
            setaviso_net('aviso_net')
            setaviso_erro('aviso_erro')
            setaviso('aviso')
            Axios.post("index.php?url=auth/login", {user: email, password:senha})
            .then(res => {
                if(res.data.data === 'Operação inválida' || res.data.data === "Usuário não encontrado"){
                    setaviso_erro('aviso_erro mostrar')
                    setaviso('aviso')
                    setaviso_net('aviso_net')
                    setdarespaco('')
                    setlogando('');        
                }
                else{
                    localStorage.setItem('token_jwt', res.data.data[0])
                    localStorage.setItem('u_name', res.data.data[1])
                    setTimeout(() =>{ history.push('/home')}, 3000);
                }
            }).catch(erro => {
                setaviso_net('aviso_net mostrar')
                setaviso_erro('aviso_erro mostrar')
                setaviso('aviso')
                setdarespaco('')
                setlogando('');    

            })
        }
    }
    return(
    <div className="login-back">
        <div className="login">
            <div className="titulo">
                <h2>Login</h2>
            </div>
            <div className={'loader '+darespaco} >
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
                <div className={'dot '+logando}></div>
            </div>
            <h3 className={aviso}>Preencha os dados*</h3>
            <h3 className={aviso_erro}>Senha ou email incorretos*</h3>
            <h3 className={aviso_net}>Verifique sua internet, ou fale com o fornecedor*</h3>
            <div className="entradas">
                <input onChange={(e) => setemail(e.target.value)} placeholder=" "></input>
                <label className="nome">Email:</label>
            </div>
            <div className="entradas">
                <input onChange={(e) => setsenha(e.target.value)} type="password" placeholder=" "></input>
                <label className="nome">Senha:</label>
            </div>
            <div className="botoes">
                <button onClick={(e) => login()}>Entrar</button>
            </div>
        </div>
    </div>
    )
   
}
export default Login;
