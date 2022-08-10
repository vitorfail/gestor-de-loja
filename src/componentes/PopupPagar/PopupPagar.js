
import "./PopupPagar.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";

export default class PopupPagar extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            pagar:'',
            loading:'loading'
        }
        this.Pagamento = this.Pagamento.bind(this)
    }
    componentDidMount(){
    }
    Pagamento(){
        this.setState({loading:'loading mostrar'})
        Axios.post('processarpagamento.php').then(res => {
            window.open(res.data, '_blank'); 
            this.setState({loading:'loading'})
        })
    }
    render(){
        return(
            <div className={this.props.exibir}>
                <Loading1 loading={this.state.loading}></Loading1>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Situação conta</h1>
                        </div>
                        <div>
                            <h3>Sua licenta esta no prazo de carência regularize antes do vencimento, senão não poderá mais acessar o sistem</h3>
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add"  onClick={(event) => this.Pagamento()}>Adicionar</button>
                        <button  className="cancel" onClick={(event) => this.props.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
