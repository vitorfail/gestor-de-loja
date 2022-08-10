
import "./PopupPagar.css";
import React, {Component} from "react";
import Axios from "../../Axios";

export default class PopupPagar extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            pagar:''
        }
        this.Pagamento = this.Pagamento.bind(this)
    }
    componentDidMount(){
        this.Pagamento()
    }
    Pagamento(){
        Axios.post('processarpagamento.php').then(res => {
            this.setState({pagar: res.data}) 
        })
    }
    render(){
        return(
            <div className={this.props.exibir}>
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
                        <a className="add" href={this.state.pagar} target="_blank" >Adicionar</a>
                        <button  className="cancel" onClick={(event) => this.props.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
