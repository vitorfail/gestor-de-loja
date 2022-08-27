
import "./PopupPrazo.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";
import { Authcontext } from "../Store/Context";

export default class PopupPrazo extends Component{
    constructor(){
        super()
        this.state = {
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            pagar:'',
            loading:'loading',
            conteudo:<p className="aviso_licenca">Faltam poucos dias para entrar no prazo de carência</p>
        }
        this.Pagamento = this.Pagamento.bind(this)
    }
    static contextType = Authcontext
    componentDidMount(){
    }
    Pagamento(){
        this.setState({loading:'loading mostrar'})
        Axios.post('index.php?url=check/pesquisa').then(res =>{
            window.open('http://localhost:3000/check/'+res.data.data, '_blank').focus();
        })
    }
    render(){
        const {pp_prazo, setpp_prazo} = this.context
        return(
            <div className={pp_prazo}>
                <Loading1 loading={this.state.loading}></Loading1>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Aviso</h1>
                        </div>
                        <div className="licenca">
                            {this.state.conteudo}
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add"  onClick={(event) => this.Pagamento()}>Pagar</button>
                        <button  className="cancel" onClick={(event) => setpp_prazo('popup-prazo')}>Mais tarde</button>
                    </div>
                </div>
            </div>
        )    
    }

}
