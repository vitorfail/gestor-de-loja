import "./Verifique.css";
import "./Login.scss";
import React, { useState } from "react";
import Axios from "../../Axios.js";
import { useHistory } from "react-router-dom";
import { Authcontext } from "../../componentes/Store/Context";
function Verifique(){
    const {setnome_user, setend_user, setemail_user, setnumero_user} = React.useContext(Authcontext)
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');
    const [um, setum] = useState('')
    const [dois, setdois] = useState('')
    const [tres, settres] = useState('')
    const [quatro, setquatro] = useState('')
    const [cinco, setcinco] = useState('')
    const [seis, setseis] = useState('')
    const [aviso, setaviso] = useState('aviso');
    const [aviso_erro, setaviso_erro] = useState('aviso_erro');
    const [aviso_net, setaviso_net] = useState('aviso_net')
    const history = useHistory();
    const [ logando, setlogando] = useState('');
    const [darespaco, setdarespaco] = useState('');

    function login(){
        if(email === ''|| senha === ''){
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
                    setnome_user(res.data.data[1])
                    setend_user(res.data.data['endereco'])
                    setemail_user(res.data.data['email'])
                    setnumero_user(res.data.data['telefone'])
                    console.log(res.data.data[1])
                    setTimeout(() =>{ history.push('/')}, 3000);
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
    function encaminhar(){
        history.push('/')
    }
    function numero_pas(event){
        if(event.key === 0 || event.key === 1 || event.key === 2 || event.key === 3 
        || event.key === 4 || event.key === 5 || event.key === 6 || event.key === 7 || event.key === 8 || event.key === 9){
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }
    return(
    <div className="verifique-back">
        <div className="login">
            <div className="titulo">
                <h2>Verificação</h2>
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
            <h3>Digite o codigo de verificação que chegou em seu email</h3>
            <form className="entradas">
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
                <input maxLength={1} onKeyDown={(event) => numero_pas(event)}></input>
            </form>
            <div className="botoes">
                <button onClick={(e) => login()}>Entrar</button>
            </div>
        </div>
    </div>
    )
   
}
export default Verifique;