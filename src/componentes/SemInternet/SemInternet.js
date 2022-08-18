
import "./SemInternet.css";
import React, {Component} from "react";

export default class SemInternet extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
        }
        this.Recarregar = this.Recarregar.bind(this)
    }
    Recarregar(){
        window.location.reload()
    }
    componentDidMount(){
    }
    render(){
        return(
            <div className={this.props.exibir}>
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
