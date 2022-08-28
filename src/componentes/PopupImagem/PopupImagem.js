
import "./PopupImagem.css";
import React, { useEffect, useState} from "react";
import Axios from "../../Axios";
import Exit from "../../Exit";
import { Authcontext } from "../Store/Context";
import Server from "../../Servidor";

export default function PopupImagem(){
    const [preencha, setpreencha] = useState('preencha')
    const [nome, setnome] = useState('')
    const[image, setImage] = useState(null);
    const [conteudo, setconteudo] = useState(null)
    const[previewUrl, setPreviewUrl] = useState("");     
    const {pp_imagem, setpp_imagem, nome_user} = React.useContext(Authcontext)
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
            console.log(res.data)
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
    useEffect(() => {
        if(urlimage !== ''){
            if(image ===null){
                setconteudo(<img alt="perfil1" src={urlimage}></img>)
                setnome(nome_user)
            }
        }
        setpreencha("preencha") 
    }, [setpreencha, image, previewUrl, setconteudo, urlimage, nome_user])
    return(
        <div className={pp_imagem}>
            <div className="menu">
                <div className="inputs">
                    <div className="titulo">
                        <h1>{nome}</h1>
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
                </div>
                <div className="botoes">
                    <button className="add" onClick={(e) => enviar_imagem()} >Adicionar</button>
                    <button  className="cancel" onClick={(event) => setpp_imagem("popup-imagem")}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
