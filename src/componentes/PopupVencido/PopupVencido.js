
import "./PopupVencido.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";
import { Authcontext } from "../Store/Context";

export default class PopupVencido extends Component{
    constructor(){
        super()
        this.state = {
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            pagar:'',
            loading:'loading',
            conteudo:<p className="aviso_licenca">Seu prazo de carência acabou. Page a fatura para poder usar o sistema denovo</p>
        }
        this.Pagamento = this.Pagamento.bind(this)
    }
    static contextType = Authcontext
    componentDidMount(){
    }
    Pagamento(){
        this.setState({loading:'loading mostrar'})
        Axios.post('processarpagamento.php').then(res => {
            window.open(res.data, '_blank'); 
            this.setState({loading:'loading'})
        }).catch(error =>{
            this.setState({loading:'loading'})

            this.setState({conteudo: <p className="err-mercado">Não foi possível encaminhar você para o Mercado Pago Verifique sua internet e tente donovo</p>})
        })
    }
    render(){
        const {pp_vencido} = this.context
        return(
            <div className={pp_vencido}>
                <Loading1 loading={this.state.loading}></Loading1>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Conta Vencida</h1>
                        </div>
                        <div className="licenca">
                            {this.state.conteudo}
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add"  onClick={(event) => this.Pagamento()}>Pagar</button>
                    </div>
                </div>
            </div>
        )    
    }
}
