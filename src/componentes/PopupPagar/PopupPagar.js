
import "./PopupPagar.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";
import { Authcontext } from "../Store/Context";

export default class PopupPagar extends Component{
    constructor(props){
        super(props)
        this.state = {
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            pagar:'',
            loading:'loading',
            conteudo:<p className="aviso_licenca">Sua licenta esta no prazo de <strong>carência</strong> regularize antes do 
            <strong>vencimento</strong>. Depois do prazo de carência só poderá 
           usar o sistema depois de efeturar pagamento</p>
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
        const {pp_pagar, setpp_pagar} = this.context
        return(
            <div className={pp_pagar}>
                <Loading1 loading={this.state.loading}></Loading1>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Atenção!!</h1>
                        </div>
                        <div className="licenca">
                            {this.state.conteudo}
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add"  onClick={(event) => this.Pagamento()}>Pagar</button>
                        <button  className="cancel" onClick={(event) => setpp_pagar('popup-pagar')}>Mais tarde</button>
                    </div>
                </div>
            </div>
        )    
    }

}
