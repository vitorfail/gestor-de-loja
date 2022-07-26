
import "./PopupEstoque.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import { Authcontext } from "../Store/Context";

export default class PopupEstoque extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha"
        }
        this.add_produtos = this.add_produtos.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this) 
    }
    static contextType = Authcontext
    componentDidMount(){
        this.setState({produto_nome_: ''})
        this.setState({produto_valor_: ''})
        this.setState({percentual_: ''})
        this.setState({quantidade_: ''})
        this.setState({preencha: "preencha"})
    }
    add_produtos(){
        const {setpp_estoque} = this.context
        this.setState({preencha: "preencha"})
        if(this.state.produto_nome_ ==='' || this.state.produto_valor_ ==='' 
        || this.state.percentual_ ==='' || this.state.quantidade_ ==='' || this.state.percentual_ ==='%'){
            setTimeout(() =>  this.setState({preencha: "preencha mostrar"}), 4);
        }
        else{
            var custo = this.state.produto_valor_.replace('.', '').replace("R$ ", "")
            custo = parseFloat(custo.replace(",", "."))
            var qtd = parseInt(this.state.quantidade_)
            Axios.post('index.php?url=inserirprodutos/pesquisa', {
                produto_nome:this.state.produto_nome_ , produto_valor: custo, 
                percentual:this.state.percentual_, quantidade:qtd }).then(res =>{
                    if(res.data.data === '1'){
                        setpp_estoque('popup-estoque')
                        this.props.reiniciar()
                        this.setState({produto_nome_: ''})
                        this.setState({produto_valor_: ''})
                        this.setState({percentual_: ''})
                        this.setState({quantidade_: ''})
                    }
                    if(res.data.data === '0'){
    
                    }
                }).catch(erro =>{
    
                })
        }
    }
    mascara_valor(e){
        e = e.replace(/\D/g, "")
        e = e.replace(/(\d)(\d{2})$/, "$1,$2")
        e = 'R$ ' + e.replace(/(?=(\d{3})+(\D))\B/g, ".")
        this.setState({produto_valor_: e}) 
    }
    mascara_percentual(e){
        e = e.replace(/\D/g, "")
        e = e+"%"
        this.setState({percentual_: e})
    }
    delete_percental(e){
        if(e === 8){
            var r = this.state.percentual_.substring(0, this.state.percentual_.length - 2);
            r = r +"%"
            this.setState({percentual_: r})
        }
    }
    render(){
        const {pp_estoque, setpp_estoque} = this.context
        return(
            <div className={pp_estoque}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Novo produto</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <input value={this.state.produto_nome_} onChange={(event) => this.setState({produto_nome_: event.target.value})} ></input>
                            <label className="nome">Nome da peça</label>
                        </div>
                        <div className="input">
                            <input value={this.state.produto_valor_} onChange={(event) => this.mascara_valor(event.target.value)}></input>
                            <label className="nome">Custo(R$)</label>
                        </div>
                        <div className="input">
                            <input type="number" value={this.state.quantidade_} onChange={(event) => this.setState({quantidade_: event.target.value})} ></input>
                            <label className="nome">Quantidade</label>
                        </div>
                        <div className="input">
                            <input  value={this.state.percentual_} onKeyDown={(even) => this.delete_percental(even.keyCode)} onChange={(event) => this.mascara_percentual(event.target.value)} ></input>
                            <label className="nome">Percentual(%)</label>
                        </div>

                    </div>
                    <div className="botoes">
                        <button className="add" onClick={(event) => this.add_produtos()} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => setpp_estoque('popup-estoque')}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
