
import "./PopupEditar.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";
import { Authcontext } from "../Store/Context";

export default class PopupEditar extends Component{
    constructor(){
        super()
        this.state = {
            id:'',
            produto_nome_: '',
            valor_compra: '',
            percentual_: '',
            quantidade_:'',
            loading:'loading',
            preencha: "preencha",
            conteudo:<p className="aviso_licenca">Sua licenta esta no prazo de <strong>carência</strong> regularize antes do 
            <strong>vencimento</strong>. Depois do prazo de carência só poderá 
           usar o sistema depois de efeturar pagamento</p>,
        }
        this.editar = this.editar.bind(this)
        this.delete_percental = this.delete_percental.bind(this)
        this.fechar = this.fechar.bind(this)
    }
    static contextType = Authcontext
    componentWillReceiveProps(props){
        this.setState({preencha: "preencha"})
        const {setsem_internet} = this.context
        if(props.id !== 'teste'){
            Axios.post('index.php?url=editar/puxar_info', {id: parseInt(props.id)})
            .then(res => {
                if(res.data.data !== '0'){
                    this.setState({id: props.id})
                    this.setState({produto_nome_:res.data.data["produto-nome"]})
                    this.setState({quantidade_: res.data.data["quantidade"]}) 
                    this.mascara_valor(res.data.data["produto_valor"])
                    this.setState({ percentual_:res.data.data["percentual"]})
                }
            }).catch( error =>{
                setsem_internet('sem-internet mostrar')
            })
        }
    }
    editar(){
        const { setpp_editar, setsem_internet} = this.context
        if(this.state.produto_nome_ === '' ||this.state.valor_compra === '' 
        ||this.state.percentual_ === '' || this.state.quantidade_ === ''){
            this.setState({preencha: "preencha"})
        }
        else{
            var produto_valor = parseFloat(((this.state.valor_compra.replace('R$ ', '')).replace('.', '')).replace(',', '.'))
            Axios.post('index.php?url=editar/pesquisa', {id: this.state.id, valor: produto_valor, 
                custo_indireto:0, nome: this.state.produto_nome_, quantidade: this.state.quantidade_ 
                ,percentual: this.state.percentual_})
                .then(res => {
                    console.log(res.data)
                    if(res.data.data === '1'){
                        setpp_editar('popup-editar')
                    }
                }).catch( error =>{
                    setsem_internet('sem-internet mostrar')
                })
        }


    }
    mascara_valor(e){
        e = parseFloat(e)
        e = String(e.toFixed(2))
        e = e.replace(/\D/g, "")
        e = e.replace(/(\d)(\d{2})$/, "$1,$2")
        e = 'R$ ' + e.replace(/(?=(\d{3})+(\D))\B/g, ".")
        this.setState({valor_compra: e}) 
    }
    delete_percental(e){
        if(e === 8){
            var r = this.state.percentual_.substring(0, this.state.percentual_.length - 2);
            r = r +"%"
            this.setState({percentual_: r})
        }
    }
    mascara_percentual(e){
        e = e.replace(/\D/g, "")
        e = e+"%"
        this.setState({percentual_: e})
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
    fechar(){
        const {setpp_editar} = this.context
        setpp_editar('popup-editar')
    }
    render(){
        const {pp_editar} = this.context
        return(
            <div className={pp_editar}>
                <div className="menu">
                    <div className="inputs">
                        <div className="titulo">
                            <h1>Editar produto</h1>
                            <h3 className={this.state.preencha}>Preencha os dados*</h3>
                        </div>
                        <div className="input">
                            <input value={this.state.produto_nome_} onChange={(event) => this.setState({produto_nome_: event.target.value})} placeholder="R$ 00,00"></input>
                            <label className="nome">Nome</label>
                        </div>
                        <div className="input">
                            <input value={this.state.valor_compra} onChange={(event) => this.mascara_valor(event.target.value)} placeholder="R$ 00,00"></input>
                            <label className="nome">Valor de compra</label>
                        </div>
                        <div className="input">
                            <input type="number" value={this.state.quantidade_} placeholder="R$ 00,00"  max={this.state.maximo_quantidade} onChange={(event) => this.quantidade(event.target.value)} ></input>
                            <label className="nome">Quantidade</label>
                        </div>
                        <div className="input">
                            <input type="text" value={this.state.percentual_} onKeyDown={(even) => this.delete_percental(even.keyCode)} placeholder="R$ 00,00" onChange={(event) => this.mascara_percentual(event.target.value)} ></input>
                            <label className="nome">Percentual(%)</label>
                        </div>

                    </div>
                    <div className="botoes">
                        <button className="add" onClick={(event) => this.editar()} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => this.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
