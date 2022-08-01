import "./Login.css";
import React, { useState } from "react";
import Axios from "../../Axios.js";
import { useHistory } from "react-router-dom";
function Login(){
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [aviso, setaviso] = useState('aviso');
    const history = useHistory()
    function login(){
        if(email == ''|| senha == ''){
            setaviso("aviso")
            setTimeout(() =>  setaviso('aviso mostrar'), 4);
        }
        else{
            Axios.post("index.php?url=auth/login", {user: email, password:senha})
            .then(res => {
                if(res.data.data === 'Operação inválida' || res.data.data === "Usuário não encontrado"){

                }
                else{
                    localStorage.setItem('token_jwt', res.data.data[0])
                    localStorage.setItem('u_name', res.data.data[1])
                    setTimeout(() =>{ history.push('/home')}, 3000);

                }
            })
        }
    }

    return(
    <div className="login-back">
        <div className="login">
            <div className="titulo">
                <h2>Login</h2>
            </div>
            <h3 className={aviso}>Preencha os dados*</h3>
            <div className="entradas">
                <input onChange={(e) => setemail(e.target.value)} placeholder=" "></input>
                <label className="nome">Email:</label>
            </div>
            <div className="entradas">
                <input onChange={(e) => setsenha(e.target.value)} placeholder=" "></input>
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
