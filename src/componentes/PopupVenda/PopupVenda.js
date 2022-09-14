
import "./PopupVenda.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Exit from "../../Exit";
import { Authcontext } from "../Store/Context";

export default class PopupVenda extends Component{
    constructor(props){
        super(props)
        this.state = {
            produto_nome_: '',
            id_produto: '',
            valor_venda: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha",
            dados:[],
            tipo_pagamento: 'A vista',
            maximo_quantidade: 0,
            maximo_largura: 0,
            valor_venda_recomendado: 0,
            data:''
        }
        this.puxar_produtos = this.puxar_produtos.bind(this)
        this.add_venda = this.add_venda.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this)
        this.identificar_produto = this.identificar_produto.bind(this)
        this.quantidade = this.quantidade.bind(this)
        this.mask_data = this.mask_data.bind(this)
    }
    static contextType = Authcontext

    puxar_produtos(){
        var data_ = new Date()
        var dias = data_.getDate()
        var mes = data_.getMonth()+1
        if( data_.getDate() <10) dias = "0"+dias
        if( (data_.getMonth()+1) <10) mes = "0"+mes
        var data_hoje = dias+"/"+mes+"/"+data_.getFullYear()
        this.setState({data: data_hoje})

        this.setState({dados: this.lista})
        this.lista =[]
        Axios.post('index.php?url=produtos/pesquisa').then(
            res => {
                var dados = res.data.data
                if( dados=== 'Usuário não autenticado'){
                    Exit()
                }
                else{
                    console.log(dados['custo_fixo'])
                    var id_roupas = dados['id']
                    var lista_roupas = dados['nomes']
                    var qtd = dados['qtd']
                    var custo_direto = dados['produto_valor']
                    var custo_indireto = dados['custo_fixo']
                    var percentual = dados['percentual']
                    for(var i = 0; i < lista_roupas.length; i++){
                        var lucro = parseFloat(percentual[i].replace("%", ''))/ 100
                        var custo = ((parseFloat(custo_direto[i]) + custo_indireto)*lucro) + (parseFloat(custo_direto[i]) + parseFloat(custo_indireto))
                        this.lista.push(
                        <option key={id_roupas[i] +"lista_roupas"+lista_roupas[i]+i+Math.random()}  value={lista_roupas[i]+"-----"+id_roupas[i]+"-----"+qtd[i]+"-----"+custo.toFixed(2)} >{lista_roupas[i]}</option>
                        )
                    }
                    this.setState({dados: this.lista})
                }
            }
        ).catch(erro =>{
            console.log(erro)
            //alert("Erro ao tentar procurar produtos. Verifique sua internet e tente denovo")
        })
    }
    componentWillReceiveProps(){
        this.setState({preencha: "preencha"})
        this.puxar_produtos()
    }
    add_venda(){
        const {setpp_venda} = this.context
        if(this.state.data ==='' || this.state.valor_venda ==='' 
        || this.state.produto_nome_ ==='' || this.state.id_produto ==='' || this.state.tipo_pagamento ==='' || this.state.quantidade_=== ''){
            setTimeout(() =>  this.setState({preencha: "preencha mostrar"}), 4);
        }
        else{
            var data_hoje =  this.state.data.split('/')
            data_hoje = data_hoje[2]+'-'+data_hoje[1]+'-'+data_hoje[0]
            var preco = parseFloat(((this.state.valor_venda.replace('R$ ', '')).replace('.', '')).replace(',', '.'))
            Axios.post('index.php?url=inserirvenda/pesquisa', { nome:this.state.produto_nome_, 
                data:data_hoje, 
                id:parseInt(this.state.id_produto), 
                valor:preco, 
                tipo:this.state.tipo_pagamento, qtd:parseInt(this.state.quantidade_ )}).then(res =>{
                    if(res.data.data === '1'){
                        setpp_venda('popup-venda')
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
        this.setState({valor_venda: lista[3].replace('.', ',')})
        this.setState({valor_venda_recomendado: lista[3]})
    }
    quantidade(qtd){
        var largura = this.state.maximo_largura
        this.setState({quantidade_: qtd.slice(0, largura)})
    }
    mask_data(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{4})$/, '$1/$2');
        e = e.replace(/^(\d{2})(\d)/, '$1/$2');
        return e;
    }
    render(){
        const {pp_venda, setpp_venda} = this.context
        return(
            <div className={pp_venda}>
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
                            <select  value={this.state.tipo_pagamento}  onChange={(event) => this.setState({tipo_pagamento: event.target.value})} >
                                <option value="A vista">A vista</option>
                                <option value="Parcelado">Parcelado</option>
                                <option value="Boleto">Boleto</option>
                                <option value="Pix">Pix</option>
                            </select>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.data} placeholder="R$ 00,00" onChange={(event) => this.setState({data: this.mask_data(event.target.value)})} maxLength="10"></input>
                            <label className="nome">Data de venda</label>
                        </div>
    
                    </div>
                    <div className="botoes">
                        <button className="add" onClick={(event) => this.add_venda()} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => setpp_venda('popup-venda')}>Cancelar</button>
                    </div>
                </div>
            </div>
        )        
    }


}
