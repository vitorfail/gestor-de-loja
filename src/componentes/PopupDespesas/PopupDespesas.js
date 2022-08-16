
import "./PopupDespesas.css";
import React, {Component} from "react";
import Axios from "../../Axios";

export default class PopupDespesas extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha",
            data:'',
            vencimento:''
        }
        this.add_produtos = this.add_produtos.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this) 
        this.mask_data = this.mask_data.bind(this) 
    }
    componentDidMount(){
        var data = new Date()
        var dias = data.getDate()
        var mes = data.getMonth()+1

        if(dias< 10) dias = '0'+dias
        if(mes< 10) mes = '0'+mes
        this.setState({data: dias+'/'+mes+"/"+data.getFullYear()})

        this.setState({preencha: "preencha"})
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
            Axios.post('index.php?url=inserirdespesa/pesquisa', {
                valor:this.state.produto_nome_ , data_vencimentor: custo, 
                data_pagamento:this.state.percentual_ }).then(res =>{
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
    mask_data(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{4})$/, '$1/$2');
        e = e.replace(/^(\d{2})(\d)/, '$1/$2');
        return e;
    }
    render(){
        return(
            <div className={this.props.exibir}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Nova despesas</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <input value={this.state.produto_nome_} onChange={(event) => this.setState({produto_nome_: event.target.value})} ></input>
                            <label className="nome">Descrição</label>
                        </div>
                        <div className="input">
                            <input value={this.state.produto_valor_} onChange={(event) => this.mascara_valor(event.target.value)}></input>
                            <label className="nome">Valor(R$)</label>
                        </div>
                        <div className="input">
                            <input  value={this.state.data} onChange={(even) => this.mask_data(even.target.value)}  ></input>
                            <label className="nome">Data</label>
                        </div>
                        <div className="input">
                            <input  value={this.state.vencimento} onChange={(even) => this.mask_data(even.target.value)}  ></input>
                            <label className="nome">Vencimento</label>
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
