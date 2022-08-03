import "./Registro.css";
import React, { useState } from "react";
import Axios from "../../Axios.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Registro(){
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [confirmar, setconfirmar] = useState('');
    const [aviso, setaviso] = useState('aviso');
    const [aviso_senha, setaviso_senha] = useState('aviso_senha');
    const [nome, setnome] = useState('');
    const [ipv4, setip] =useState('');
    const [end, setend] = useState('');
    const [plano, setplano] = useState('Normal');


    const history = useHistory()
    function ip_teste(){
        axios.get('https://geolocation-db.com/json/').then(
            res =>{
                setip(res.data.IPv4);        
            }
        )
    }
    function register(){
        ip_teste()
        if(email === ''|| senha === ''|| nome === ''){
            setaviso("aviso")
            setTimeout(() =>  setaviso('aviso mostrar'), 4);
        }
        if(senha !== confirmar){
            setaviso_senha('aviso_senha mostrar')
        }
        else{
            Axios.post("index.php?url=auth/registro", {user_nome:nome, user_email: email, 
                password:senha, password_confirm:confirmar, ip:ipv4, endereco:end, plano_:plano})
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
    <div className="register-back">
        <div className="register">
            <div className="titulo">
                <h2>Registro</h2>
            </div>
            <h3 className={aviso}>Preencha os dados*</h3>
            <h3 className={aviso_senha}>As senha não estão iguais*</h3>
            <div className="entradas">
                <input onChange={(e) => setnome(e.target.value)} placeholder=" "></input>
                <label className="nome">Nome da empresa:</label>
            </div>
            <div className="entradas">
                <input onChange={(e) => setend(e.target.value)} placeholder=" "></input>
                <label className="nome">Endereço(Opcional):</label>
            </div>
            <div className="entradas">
                <input onChange={(e) => setemail(e.target.value)} placeholder=" "></input>
                <label className="nome">Email:</label>
            </div>
            <div className="entradas">
                <select onChange={(e) => setplano(e.target.id)}>
                    <option id="Normal">Plano 1 (R$ 30,00)</option>
                    <option id="Médio">Plano 2 (R$ 40,00)</option>
                    <option id="Avançado">Plano 3 (R$ 50,00)</option>
                </select>
            </div>
            <div className="entradas">
                <input onChange={(e) => setsenha(e.target.value)} type="password" placeholder=" "></input>
                <label className="nome">Senha:</label>
            </div>
            <div className="entradas">
                <input onChange={(e) => setconfirmar(e.target.value)}  type="password" placeholder=" "></input>
                <label className="nome">Comfirmar Senha:</label>
            </div>
            <div className="botoes">
                <button onClick={(e) => register()}>Entrar</button>
            </div>
        </div>
    </div>
    )
   
}
export default Registro;
