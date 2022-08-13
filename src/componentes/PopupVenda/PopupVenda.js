
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
            id_produto:'',
            valor_venda: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha",
            dados:[],
            tipo_pagamento:'',
            maximo_quantidade:0,
            maximo_largura:0,
            valor_venda_recomendado:0
        }
        this.add_venda = this.add_venda.bind(this)
        this.puxar_produtos = this.puxar_produtos.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this)
        this.identificar_produto = this.identificar_produto.bind(this) 
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
                    var custo_direto = res.data.data[3]
                    var custo_indireto = res.data.data[4]
                    var percentual = res.data.data[5]
                    for(var i = 0; i < lista_roupas.length; i++){
                        var lucro = parseFloat(percentual[i].replace("%", ''))/ 100
                        var custo = ((parseFloat(custo_direto[i]) + parseFloat(custo_indireto[i]))*lucro) + (parseFloat(custo_direto[i]) + parseFloat(custo_indireto[i]))
                        this.lista.push(
                        <option key={id_roupas[i] +"lista_roupas"+lista_roupas[i]+i}  value={lista_roupas[i]+"-----"+id_roupas[i]+"-----"+qtd[i]+"-----"+custo.toFixed(2)} >{lista_roupas[i]}</option>
                        )
                    }
                    this.setState({dados: this.lista})
                }
            }
        ).catch(erro =>{
            alert("Erro ao tentar procurar produtos. Verifique sua internet e tente denovo")
        })
    }
    componentWillReceiveProps(props){
        if(props.exibir === "popup-venda"){
            
        }
        else{
            this.puxar_produtos()
        }
    }
    add_venda(){
        this.setState({preencha: "preencha"})
        if(this.state.produto_nome_ ==='' || this.state.valor_venda ==='' 
        || this.state.percentual_ ==='' || this.state.quantidade_ ==='' || this.state.percentual_ ==='%'){
            setTimeout(() =>  this.setState({preencha: "preencha mostrar"}), 4);
        }
        else{
            var data_ = new Date()
            var data_hoje = data_.getFullYear()+"-"+(data_.getMonth()+1)+"-"+data_.getDate()
            Axios.post('index.php?url=inserirprodutos/pesquisa', { nome:this.state.produto_nome_, 
                data:data_hoje, 
                id:this.state.id_produto, 
                valor:this.state.valor_venda, 
                tipo:this.state.tipo_pagamento, qtd:this.state.quantidade_ }).then(res =>{
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
        this.setState({valor_venda: e}) 
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
    identificar_produto(array){
        var lista = array.split("-----")
        this.setState({produto_nome_: lista[0]})
        this.setState({id_produto: lista[1]})
        this.setState({quantidade_: lista[2]})
        this.setState({maximo_quantidade: lista[2]})
        this.setState({maximo_largura: lista[2].length})
        this.setState({valor_venda: lista[3]})
        this.setState({valor_venda_recomendado: lista[3]})
    }
    quantidade(qtd){
        var largura = this.state.maximo_largura
        this.setState({quantidade_: qtd.slice(0, largura)})
    }
    render(){
        return(
            <div className={this.props.exibir}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>VENDA</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <select onChange={(event) => this.identificar_produto(event.target.value, event.currentTarget.id, event.target.name)} >
                                {this.state.dados}
                            </select>
                        </div>
                        <div className="input">
                            <input value={this.state.valor_venda} onChange={(event) => this.mascara_valor(event.target.value)} placeholder="R$ 00,00"></input>
                            <label className="nome">Valor de venda Mínimo(R${this.state.valor_venda_recomendado})</label>
                        </div>
                        <div className="input">
                            <input type="number" value={this.state.quantidade_} placeholder="R$ 00,00"  max={this.state.maximo_quantidade} onChange={(event) => this.quantidade(event.target.value)} ></input>
                            <label className="nome">Quantidade</label>
                        </div>
                        <div className="input">
                            <input  value={this.state.percentual_} placeholder="R$ 00,00" onKeyDown={(even) => this.delete_percental(even.keyCode)} onChange={(event) => this.mascara_percentual(event.target.value)} ></input>
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
