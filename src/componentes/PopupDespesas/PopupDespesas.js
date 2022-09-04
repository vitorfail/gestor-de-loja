
import "./PopupDespesas.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import { Authcontext } from "../Store/Context";


export default class PopupDespesas extends Component{
    constructor(props){
        super(props)
        this.state = {
            mostrar: this.props.exibir,
            descricao: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            preencha: "preencha",
            data:'',
            vencimento:'',
            pago:false,
            aberto: false,
            data_pagamento:'none'
        }
        this.add_despesa = this.add_despesa.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.mascara_percentual = this.mascara_percentual.bind(this)
        this.delete_percental = this.delete_percental.bind(this) 
        this.mask_data = this.mask_data.bind(this)
        this.mask_data_vencimento = this.mask_data_vencimento.bind(this)
        this.selecionarpago = this.selecionarpago.bind(this)
        this.selecionaraberto = this.selecionaraberto.bind(this) 
    }
    static contextType = Authcontext
    componentDidMount(){
        var data = new Date()
        var dias = data.getDate()
        var mes = data.getMonth()+1

        if(dias< 10) dias = '0'+dias
        if(mes< 10) mes = '0'+mes
        this.setState({data: dias+'/'+mes+"/"+data.getFullYear()})
        this.setState({vencimento: dias+'/'+mes+"/"+data.getFullYear()})
        this.setState({preencha: "preencha"})
        
    }
    add_despesa(){
        const {setpp_despesa} = this.context
        this.setState({preencha: "preencha"})
        if(this.state.descricao ==='' || this.state.produto_valor_ ==='' 
        || this.state.data ==='' || this.state.vencimento === ''){
            setTimeout(() =>  this.setState({preencha: "preencha mostrar"}), 4);
        }
        else{
            var custo = this.state.produto_valor_.replace('.', '').replace("R$ ", "")
            var data_venci =  this.state.vencimento.split('/')
            data_venci = data_venci[2]+'-'+data_venci[1]+'-'+data_venci[0]
            var data_hoje =  this.state.data.split('/')
            data_hoje = data_hoje[2]+'-'+data_hoje[1]+'-'+data_hoje[0]
            custo = parseFloat(custo.replace(",", "."))
            Axios.post('index.php?url=inserirdespesa/pesquisa', {nome: this.state.descricao,
                valor:custo , data_vencimento: data_venci, 
                data:data_hoje, situacao: this.state.pago}).then(res =>{
                    if(res.data.data === '1'){
                        setpp_despesa('popup-despesa')
                        this.props.reiniciar()
                    }
                    if(res.data.data === '0'){
                        alert("passou aqui")
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
        this.setState({data: e})
    }
    mask_data_vencimento(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{4})$/, '$1/$2');
        e = e.replace(/^(\d{2})(\d)/, '$1/$2');
        this.setState({vencimento: e})
    }
    selecionarpago(){
        this.setState({pago: true})
        this.setState({aberto: false})
        this.setState({data_pagamento: 'flex'})
    }
    selecionaraberto(){
        this.setState({aberto: true})
        this.setState({pago: false})
        this.setState({data_pagamento: 'none'})
    } 
 
    render(){
        const {pp_despesa, setpp_despesa} = this.context
        return(
            <div className={pp_despesa}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Nova despesas</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.descricao} onChange={(event) => this.setState({descricao: event.target.value})} ></input>
                            <label className="nome">Descrição</label>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.produto_valor_} onChange={(event) => this.mascara_valor(event.target.value)}></input>
                            <label className="nome">Valor(R$)</label>
                        </div>
                        <div className="input">
                            <div className="check">
                                <input type='checkbox' checked={this.state.pago} onChange={() => this.selecionarpago()} ></input>
                                <p>Paga</p>
                            </div>
                            <div className="check">
                                <input type='checkbox' checked={this.state.aberto} onChange={() => this.selecionaraberto()}></input>
                                <p>Aberta</p>
                            </div>
                        </div>
                        <div style={{display:this.state.data_pagamento}} className="input">
                            <input type="text" maxLength={10} value={this.state.data} onChange={(even) => this.mask_data(even.target.value)}  ></input>
                            <label className="nome">Data de pagamento</label>
                        </div>
                        <div className="input">
                            <input type="text" maxLength={10} value={this.state.vencimento} onChange={(even) => this.mask_data_vencimento(even.target.value)}  ></input>
                            <label className="nome">Vencimento</label>
                        </div>

                    </div>
                    <div className="botoes">
                        <button className="add" onClick={(event) => this.add_despesa()} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => setpp_despesa('popup-despesa')}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
