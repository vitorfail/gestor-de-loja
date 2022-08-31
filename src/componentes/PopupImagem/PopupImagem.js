
import "./PopupImagem.css";
import React, { useEffect, useRef, useState} from "react";
import Axios from "../../Axios";
import Exit from "../../Exit";
import { Authcontext } from "../Store/Context";
import Editar from '../../icons/editar.png'
import Server from "../../Servidor";

export default function PopupImagem(){
    const [preencha, setpreencha] = useState('preencha')
    const [disabled_nome, setdisabled_nome]= useState(false)
    const [disabled_endereco, setdisabled_endereco]= useState(false)
    const [disabled_email, setdisabled_email]= useState(false)
    const [disabled_numero, setdisabled_numero]= useState(false)
    const focus_nome = useRef(null)
    const focus_endereco = useRef(null)
    const focus_email = useRef(null)
    const focus_numero = useRef(null)
    const[image, setImage] = useState(null);
    const [conteudo, setconteudo] = useState(null)
    const[previewUrl, setPreviewUrl] = useState("");     
    const {pp_imagem, setpp_imagem, nome_user, end_user, email_user, numero_user} = React.useContext(Authcontext)
    const {urlimage} = React.useContext(Authcontext)
    function mudar_imagem(e){
        if(e !== undefined){
            var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpeg'];
            var fileType = e.type
            if(imageTypes.includes(fileType)){
                setImage(e);
                setPreviewUrl(URL.createObjectURL(e));
                setconteudo(<img alt="perfil2"  src={URL.createObjectURL(e)}></img>)    
            }
            else{
                setpreencha("preencha mostrar")
            }
        }
    }
    function enviar_imagem(){
        let data = new FormData() 
        data.append('file', image)
        if(urlimage === ''){data.append('username', '')}
        else{data.append('username', urlimage.replace(Server, ''))}
        Axios.post('index.php?url=inseririmagem/pesquisa', data, {
            headers: {
              "Content-Type": "multipart/form-data",
            }}
        ).then(res =>{
            var dados = res.data.data
            if(dados === "Usuário não autenticado"){
                Exit()
            }
            else{
                if(dados === '1'){
                    setpp_imagem('popup-imagem')
                }
            }
            }
        ).catch(erro =>{
            console.log(erro)
        })
    }
    function Editar_nome(id){
        setdisabled_nome(false)
        setdisabled_endereco(false)
        setdisabled_email(false)
        setdisabled_numero(false)
        if(id === 'nome'){
            focus_nome.current.focus();
            setdisabled_nome(true)
        }
        if(id === 'endereco'){
            focus_endereco.current.focus();
            setdisabled_endereco(true)
        }
        if(id === 'email'){
            focus_email.current.focus();
            setdisabled_email(true)
        }
        if(id === 'numero'){
            focus_numero.current.focus();
            setdisabled_numero(true)
        }
    }
    useEffect(() => {
        if(urlimage !== ''){
            if(image ===null){
                setconteudo(<img alt="perfil1" src={urlimage}></img>)
            }
        }
        setpreencha("preencha") 
    }, [setpreencha, image, previewUrl, setconteudo, urlimage, nome_user])
    return(
        <div className={pp_imagem}>
            <div className="menu">
                <div className="inputs">
                    <div className="titulo">
                        <input type="text"
                            readOnly={(disabled_nome)? false : true}
                            value= {nome_user}
                            ref={focus_nome}>
                        </input>
                        <img src={Editar} alt="editar" id='nome' onClick={(event) => Editar_nome(event.target.id)}></img>
                        <h3 className={preencha}>Selecione uma imagem</h3>
                    </div>
                    <div className="perfil">
                        <div className="foto">
                            {conteudo}
                        </div>
                    </div>
                    <div className="selecionar">
                        <input placeholder="Selecionar" type="file" onChange={(e) => mudar_imagem(e.target.files[0])}></input>
                    </div>
                    <div className="dados-user">
                        <input type="text"
                            readOnly={(disabled_endereco)? false : true}
                            value= {end_user}
                            ref={focus_endereco}>
                        </input>
                        <img src={Editar} alt="editar" id='endereco' onClick={(event) => Editar_nome(event.target.id)}></img>
                    </div>
                    <div className="dados-user">
                        <input type="text"
                            readOnly={(disabled_email)? false : true}
                            value= {email_user}
                            ref={focus_email}>
                        </input>
                        <img src={Editar} alt="editar" id='email' onClick={(event) => Editar_nome(event.target.id)}></img>
                    </div>
                    <div className="dados-user">
                        <input type="text"
                            readOnly={(disabled_numero)? false : true}
                            value= {numero_user}
                            ref={focus_numero}>
                        </input>
                        <img src={Editar} alt="editar" id='numero' onClick={(event) => Editar_nome(event.target.id)}></img>
                    </div>
                </div>
                <div className="botoes">
                    <button className="add" onClick={(e) => enviar_imagem()} >Adicionar</button>
                    <button  className="cancel" onClick={(event) => setpp_imagem("popup-imagem")}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
