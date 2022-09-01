import "./Registro.css";
import React, { useState } from "react";
import Axios from "../../Axios.js";
import { useHistory } from "react-router-dom";
import Loading1 from "../../componentes/Loading1/Loading1";
function Registro(){
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [confirmar, setconfirmar] = useState('');
    const [aviso, setaviso] = useState('aviso');
    const [aviso_senha, setaviso_senha] = useState('aviso_senha');
    const [aviso_erro, setaviso_erro] = useState('aviso_erro');
    const [aviso_net, setaviso_net] = useState('aviso_net')
    const [nome, setnome] = useState('');
    const [ipv4] =useState('');
    const [end, setend] = useState('');
    const [plano, setplano] = useState('Normal');
    const [tel, settel] = useState('');
    const [aviso_email, setaviso_email] = useState("aviso_email")
    const [loading_, setloading] = useState('loading')

    const history = useHistory()
    function telefone_mask(tel){
        tel = tel.replace(/\D/g, "");
        tel = tel.replace(/(\d)(\d{4})$/,'$1-$2')
        tel = tel.replace(/^(\d{1})(\d{1})/,'($1$2) ') 
        return tel
    }
    function register(){
        setloading('loading mostrar')
        setaviso_senha('aviso_senha')
        setaviso_erro('aviso_erro')
        setaviso_net('aviso_net')
        setaviso_email('aviso_email')
        setaviso("aviso")
        if(email === ''|| senha === ''|| nome === '' || confirmar ===''){
            setaviso("aviso")
            setTimeout(() =>  setaviso('aviso mostrar'), 4);
            setloading('loading')
        }
        else{
            if((email.includes("@") === true && email.includes(".com") === true) ||
             (email.includes(".org") === true && email.includes("@") === true)){
                if(senha !== confirmar){
                    setaviso_senha('aviso_senha mostrar')
                    setloading('loading')
                }
                else{
                    Axios.post("index.php?url=auth/registro", {user_nome:nome, user_email: email, 
                        password:senha, ip:ipv4, endereco:end, plano_:plano, telefone:tel})
                    .then(res => {
                        if(res.data.data === 'Operação inválida' || res.data.data === "Usuário não encontrado"){
                            setloading('loading')
                        }
                        if(res.data.data === "Já existe"){
                            setaviso_senha('aviso_senha')
                            setaviso_net('aviso_net')
                            setaviso_email('aviso_email')
                    
                            setaviso_erro("aviso_erro mostrar")
                            setloading('loading')
                        }
                        if(res.data.data === "0"){
                            setaviso_net('aviso_net mostrar')
                            setloading('loading')
                        }
                        if(res.data.data ==='1'){
                            setTimeout(() =>{ history.push('/login')}, 3000);
                        }
                    }).catch(err =>{
                        setloading('loading')
                        setaviso_net("aviso_net mostrar")
                    })
                }
            }
            else{
                setloading('loading')
                setaviso_email('aviso_email')
                setTimeout(() =>  setaviso_email('aviso_email mostrar'), 4);
    
            }
        }
        
    }
    return(
    <div className="register-back">
        <Loading1 loading={loading_}></Loading1>
        <div className="register">
            <div className="titulo">
                <h2>Registro</h2>
            </div>
            <h3 className={aviso}>Preencha os dados*</h3>
            <h3 className={aviso_erro}>Email já cadastrado*</h3>
            <h3 className={aviso_net}>Verifique sua internet, ou fale com o fornecedor*</h3>
            <h3 className={aviso_senha}>As senha não estão iguais*</h3>
            <h3 className={aviso_email}>Use um email válido*</h3>
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
                <input onChange={(e) => settel(telefone_mask(e.target.value))} maxLength='15' placeholder=" " value={tel}></input>
                <label className="nome">Telefone:</label>
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
