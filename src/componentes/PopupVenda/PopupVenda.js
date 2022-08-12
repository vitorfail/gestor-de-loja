
import "./PopupVenda.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Exit from "../../Exit";

export default class PopupVenda extends Component{
    constructor(props){
        super(props)
        this.lista = []
        this.state = {
            mostrar: this.props.exibir,
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha",
            dados:[]
        }
        this.add_produtos = this.add_produtos.bind(this)
        this.puxar_produtos = this.puxar_produtos.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this) 
    }

    puxar_produtos(){
        this.setState({dados: this.lista})
        this.lista =[]
        Axios.post('index.php?url=produtos/pesquisa').then(
            res => {
                if(res.data.data === 'Usuário não autenticado'){
                    Exit()
                }
                else{
                    var id_roupas = res.data.data[0]
                    var lista_roupas = res.data.data[1]
                    var qtd = res.data.data[2]
                    for(var i = 0; i < lista_roupas.length; i++){
                        this.lista.push(
                        <option key={id_roupas[i] +"lista_roupas"+lista_roupas[i]+i} value={id_roupas[i]}>{lista_roupas[i]}</option>
                        )
                    }
                    this.setState({dados: this.lista})
                }
            }
        ).catch(erro =>{
            alert("Erro ao tentar procurar produtos. Verifique sua internet e tente denovo")
        })
    }
    componentWillReceiveProps(){
        this.puxar_produtos()
    }
    add_produtos(){
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
                        this.props.fechar()
                        this.props.reiniciar()
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
        return(
            <div className={this.props.exibir}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Novo produto</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <select onChange={(event) => this.setState({produto_nome_: event.target.value})} >
                                {this.state.dados}
                            </select>
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
                        <button  className="cancel" onClick={(event) => this.props.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
