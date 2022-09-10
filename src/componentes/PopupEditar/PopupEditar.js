
import "./PopupEditar.css";
import React, {Component} from "react";
import Axios from "../../Axios";
import Loading1 from "../Loading1/Loading1";
import { Authcontext } from "../Store/Context";

export default class PopupEditar extends Component{
    constructor(){
        super()
        this.state = {
            produto_nome_: '',
            produto_valor_: '',
            percentual_: '',
            quantidade_:'',
            loading:'loading',
            conteudo:<p className="aviso_licenca">Sua licenta esta no prazo de <strong>carência</strong> regularize antes do 
            <strong>vencimento</strong>. Depois do prazo de carência só poderá 
           usar o sistema depois de efeturar pagamento</p>,
        }
        this.fechar = this.fechar.bind(this)
    }
    static contextType = Authcontext
    componentWillReceiveProps(props){
        const {setsem_internet} = this.context
        if(props.id !== 'teste'){
            Axios.post('index.php?url=editar/puxar_info', {id: parseInt(props.id)})
            .then(res => {
                console.log(res.data.data)
                if(res.data.data !== '0'){
                    this.setState({produto_nome_:res.data.data["produto-nome"]})
                    this.setState({quantidade_: res.data.data["quantidade"]}) 
                    //this.mascara_valor(res.data.data["produto_valor"])
                    //this.mascara_percentual(res.data.data["percentual"])
                }
            }).catch( error =>{
                console.log(error)
                setsem_internet('sem-internet mostrar')
            })
        }
    }
    editar(){
        const { setpp_editar, setsem_internet} = this.context
        var produto_valor = parseFloat(((this.state.produto_valor.replace('R$ ', '')).replace('.', '')).replace(',', '.'))

        Axios.post('index.php?url=editar/pesquisa', {id: this.state.id, valor: produto_valor, 
            custo_indireto:0, nome: this.state.produto_nome_, quantidade: this.state.quantidade_ 
            ,percentual: this.state.percentual_})
            .then(res => {
                if(res.data.data !== '1'){
                    setpp_editar('popup-editar')
                }
            }).catch( error =>{
                setsem_internet('sem-internet mostrar')
            })

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
        const {setpp_editar, setid_produto} = this.context
        setpp_editar('popup-editar')
        setid_produto('')
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
                            <input value={this.state.valor_venda} onChange={(event) => this.mascara_valor(event.target.value)} placeholder="R$ 00,00"></input>
                            <label className="nome">Valor de venda Mínimo(R${this.state.valor_venda_recomendado})</label>
                        </div>
                        <div className="input">
                            <input type="number" value={this.state.quantidade_} placeholder="R$ 00,00"  max={this.state.maximo_quantidade} onChange={(event) => this.quantidade(event.target.value)} ></input>
                            <label className="nome">Quantidade</label>
                        </div>
                    </div>
                    <div className="botoes">
                        <button className="add" onClick={(event) => this.add_venda()} >Adicionar</button>
                        <button  className="cancel" onClick={(event) => this.fechar()}>Cancelar</button>
                    </div>
                </div>
            </div>
        )    
    }

}
