
import "./SemInternet.css";
import React, {Component} from "react";
import { Authcontext } from "../Store/Context";

export default class SemInternet extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
        }
        this.Recarregar = this.Recarregar.bind(this)
    }
    static contextType = Authcontext
    Recarregar(){
        window.location.reload()
    }
    componentDidMount(){
    }
    render(){
        const {sem_internet} = this.context
        return(
            <div className={sem_internet}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Verifique sua internet</h1>
                        </div>
                        <div className="licenca">
                            <p className="aviso_licenca">Verifique sua internet e tente denovo. Se sua internet não estiver com problemas contate o suporte do site</p>
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add"  onClick={(event) => this.Recarregar()}>Recarregar a página</button>
                    </div>
                </div>
            </div>
        )    
    }
}
