import "./Login.css";
import React, { useState } from "react";
import Axios from "../../Axios.js";
function Login(){
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    function login(){
        alert(email)
    }

    return(
    <div className="login-back">
        <div className="login">
            <div className="titulo">
                <h2>Login</h2>
            </div>
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
