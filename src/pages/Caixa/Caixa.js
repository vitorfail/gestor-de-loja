import React, { Component } from "react";
import "./Caixa.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import BlocosCaixa from "../../componentes/BlocosCaixa/BlocosCaixa";
import Exit from '../../Exit'
import Axios from "../../Axios"
import PopupVenda from "../../componentes/PopupVenda/PopupVenda";
import PopupDespesas from "../../componentes/PopupDespesas/PopupDespesas";
import Loading from "../../componentes/Loading/Loading";
import Loading1 from "../../componentes/Loading1/Loading1";
import { Authcontext } from "../../componentes/Store/Context";

export default class Caixa extends Component{
    constructor(){
        super()
        this.lista =[];
        this.state = {
            caixa:0,
            dias: '',
            nome:'',
            despesas:0,
            vencimento:'',
            recebido_mes:0,
            isLoading: true,
            loading: "loading",
            dados: <div key={"original"} className="entrada"> 
                        <div className="vazio">
                            <h3>Sem entradas ou saidas hoje</h3>
                        </div>
                    </div>,
            dia:'',
            mes:'',
            ano:'' 
        }
        this.iniciar= this.iniciar.bind(this)
        this.mostrar_caixa = this.mostrar_caixa.bind(this)
        this.pesquisar = this.pesquisar.bind(this) 
    }
    static contextType = Authcontext
    componentDidMount(){
        var data = new Date()
        var dias = data.getDate()
        if(dias < 10) dias = "0"+dias
        var mes = data.getMonth()+1
        if(mes < 10) mes = "0"+mes
        this.setState({dia:String(dias)})
        this.setState({mes:String(mes)})
        this.setState({ano: String(data.getFullYear())})


        this.iniciar(String(mes), String(dias), String(data.getFullYear()))
        setTimeout(() =>  this.setState({isLoading: false}), 3);
    }    
    mostrar_caixa(props){
        var data = props
        if(data === '1' || data === 'Usuário não autenticado'){
            Exit()
        }
        if(data.length === 0){
            this.lista = [];
            this.setState({limite: true})
            this.lista.push(<div key={"original"} className="entrada"> 
                <div className="vazio">
                    <h3>Não há produtos</h3>
                </div>
            </div>)
            this.setState({dados: this.lista})
        }
        else{
            this.lista = [];
            for(var i=0; i< data.length; i++){
               if(data[i][2] === undefined){
                    this.lista.push(<div  key={data[i]['valor']+data[i]["descricao"]+i}  className="entrada">
                        <div className="descri">
                            <h3>{data[i]["descricao"]}</h3>
                        </div>
                        <div className="valor">
                            <h3>R$ {data[i]["valor"]} </h3>
                        </div>
                    </div>)
                }
                else{
                    this.lista.push(<div  key={data[i]['valor']+data[i]["descricao"]+i}  className="saida">
                            <div className="descri">
                                <h3>{data[i]["descricao"]}</h3>
                            </div>
                            <div className="valor">
                                <h3>R$ -{data[i]["valor"]} </h3>
                            </div>
                        </div>)
                }
            }
            this.setState({dados: this.lista})
        }
    }
    
    iniciar(mes_, dia_, ano_){
        const {setpp_pagar, setpp_prazo, setpp_vencido, setsem_internet} = this.context
        Axios.post('index.php?url=caixa/pesquisa', {user:'1', mes:mes_, dia:dia_, ano:ano_})
        .then(res => {
            var dados = res.data.data
            if(dados['valor_caixa'] === null){
                this.setState({caixa:0})
            }
            else{
                this.setState({recebido_mes: dados['valor_caixa']})
            }
            if(res.data.data[1] === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.mostrar_caixa(dados['caixa'])
                this.setState({recebido_mes: dados['valor_caixa']})
                this.setState({recebido_hoje:dados['valor_caixa']})
                this.setState({nome: dados['nome']})
                this.setState({despesas: dados['despesas']})
                if(dados['situacao'] === "Aberto"){
                    var data = dados['data_vencimento'].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        setpp_prazo('popup-prazo mostrar')
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({vencimento: 'prazo'})
                    }
                    else{
                        if(dif<0 && dif>-5){
                            setpp_pagar('popup-pagar mostrar')
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                        if(dif<-5){
                            setpp_vencido("popup-vencido mostrar")
                            this.setState({dias: Math.round(dif)})
                            this.setState({vencimento: 'vencido'})
                        }
                    }
                }
            }
        }).catch( er => {
            setsem_internet("sem-internet mostrar")
        })
    }
    restart(){
        var data = new Date()
        var dias = data.getDate()
        if(dias < 10) dias = "0"+dias
        var mes = data.getMonth()+1
        if(mes < 10) mes = "0"+mes
        this.iniciar(String(mes), String(dias), String(data.getFullYear()))
    }
    pesquisar(){
        this.setState({loading: "loading mostrar"})
        this.iniciar(this.state.mes, this.state.dia, this.state.ano)
        setTimeout(()=> this.setState({loading: "loading"}), 2000)
    }
    render(){
        const {setpp_venda, setpp_despesa} =this.context
        return(this.state.isLoading? <Loading></Loading>:
            <div className="tudo">
                <Loading1 loading={this.state.loading}></Loading1>
                <PopupDespesas  reiniciar={this.restart.bind(this)} ></PopupDespesas>
                <PopupVenda  reiniciar={this.restart.bind(this)} ></PopupVenda>

                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosCaixa despesas={this.state.despesas} recebido={this.state.recebido_mes} caixa={this.state.recebido_hoje}></BlocosCaixa>
                        <div className="mostrar-caixa">
                            <div className="tabela">
                                <div className="titulo">
                                    <select value={this.state.dia} onChange={(event) => this.setState({dia: event.target.value})}>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                    <select value={this.state.mes} onChange={(event) => this.setState({mes: event.target.value})}>
                                        <option value="01">Janeiro</option>
                                        <option value="02">Fevereiro</option>
                                        <option value="03">Março</option>
                                        <option value="04">Abril</option>
                                        <option value="05">Maio</option>
                                        <option value="06">Junho</option>
                                        <option value="07">Julho</option>
                                        <option value="08">Agosto</option>
                                        <option value="09">Setembro</option>
                                        <option value="10">Outubro</option>
                                        <option value="11">Novembro</option>
                                        <option value="12">Dezembro</option>
                                    </select>
                                    <select value={this.state.ano} onChange={(event) => this.setState({ano: event.target.value})}>
                                        <option value="1984">1984</option>
                                        <option value="1985">1985</option>
                                        <option value="1986">1986</option>
                                        <option value="1987">1987</option>
                                        <option value="1988">1988</option>
                                        <option value="1989">1989</option>
                                        <option value="1990">1990</option>
                                        <option value="1991">1991</option>
                                        <option value="1992">1992</option>
                                        <option value="1993">1993</option>
                                        <option value="1994">1994</option>
                                        <option value="1995">1995</option>
                                        <option value="1996">1996</option>
                                        <option value="1997">1997</option>
                                        <option value="1998">1998</option>
                                        <option value="1999">1999</option>
                                        <option value="2001">2001</option>
                                        <option value="2002">2002</option>
                                        <option value="2003">2003</option>
                                        <option value="2004">2004</option>
                                        <option value="2005">2005</option>
                                        <option value="2006">2006</option>
                                        <option value="2007">2007</option>
                                        <option value="2008">2008</option>
                                        <option value="2009">2009</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                        <option value="2032">2032</option>
                                        <option value="2033">2033</option>
                                        <option value="2034">2034</option>
                                        <option value="2035">2035</option>
                                        <option value="2036">2036</option>
                                        <option value="2037">2037</option>
                                        <option value="2038">2038</option>
                                        <option value="2039">2039</option>
                                        <option value="2040">2040</option>
                                    </select>
                                    <button onClick={(event) => this.pesquisar()}>Pesquisar</button>
                                </div>
                                <div className="titulo">
                                    <h3 className="descricao">Descrição</h3>
                                    <h3>Valores</h3>
                                </div>
                                {this.state.dados}                               
                            </div>
                            <div className="botoes">
                                <button className="add" onClick={(event) => setpp_venda('popup-venda mostrar')}>Adicionar venda</button>
                                <button className="del" onClick={(event) => setpp_despesa('popup-despesa mostrar')}>Adicionar despesas</button>
                            </div>
                        </div>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

