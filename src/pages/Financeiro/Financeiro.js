import React, { Component } from "react";
import "./Financeiro.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import Axios from "../../Axios.js";
import Exit from "../../Exit";
import Loading from "../../componentes/Loading/Loading";
import Relogio from "../../componentes/Relogio/Relogio";
import Loading1 from "../../componentes/Loading1/Loading1";
import { Authcontext } from "../../componentes/Store/Context";
import Server from "../../Servidor";

export default class Financeiro extends Component{
    constructor(){
        super()
        this.dados = [];
        this.state = {
            caixa:0,
            estoque: '',
            dias: '',
            nome:'',
            numero_estoque:0,
            vencimento:'',
            faturamento:0,
            despesas:0,
            tipos_de_pagamento:0,
            isLoading:true,
            loading: "loading",
            ano: '',
            ano_pesquisa:'',
            s:0,
            saldo:0
        }
        this.pesquisa = this.pesquisa.bind(this)
        this.criar_avisos = this.criar_avisos.bind(this)
        this.formatar_data = this.formatar_data.bind(this) 
        this.iniciar= this.iniciar.bind(this)
    }
    static contextType = Authcontext
    formatar_data(data){
        var list= data.split('-')
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril","Maio",
        "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        data = list[2]+', de '+meses[(parseInt(list[1])-1)]+', '+list[0]
        return data
    }
    criar_avisos(dados){
        this.dados = [];
        if(dados.produto_mais_vendido !==0){
            if(dados.produto_mais_vendido.produto_nome !== 0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O produto mais vendido é <strong>{dados.produto_mais_vendido.produto_nome}</strong>. 
                                    Vendendo ao todo <strong>{dados.produto_mais_vendido.quantidade}</strong> peças</p>
                                </div>)
            }
        }
        if(dados.produto_menos_vendido !==0){
            if(dados.produto_menos_vendido.produto_nome !== 0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>Os produtos menos vendidos são <strong>{dados.produto_menos_vendido.produto_nome[0]}</strong>,
                                    <strong>{dados.produto_menos_vendido.produto_nome[1]}</strong>, 
                                    <strong>{dados.produto_menos_vendido.produto_nome[2]}</strong>,
                                    <strong>{dados.produto_menos_vendido.produto_nome[3]}</strong>, 
                                    <strong>{dados.produto_menos_vendido.produto_nome[4]}</strong>. 
                                    Vendendo ao todo <strong>{dados.produto_menos_vendido.Qtd[0]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[1]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[2]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[3]}</strong>,
                                    <strong>{dados.produto_menos_vendido.Qtd[4]}</strong> peças</p>
                                </div>)
            }
        }
        if(dados.maior_venda !==0){
            if(dados.maior_venda.Qtd > 1){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O produtivo vendido pelo maior preço 
                                        foi <strong>{dados.maior_venda.produto_nome}</strong>. 
                                        Foram <strong>{dados.maior_venda.Qtd}</strong> peças cada uma vendida
                                         por <strong>R$ {dados.maior_venda.valor}</strong>. No dia <strong>{this.formatar_data(dados.maior_venda.data)}</strong> </p>
                                </div>)
            }
            else{
                this.dados.push(<div key={Math.random()} className="info">
                <p>O produtivo vendido pelo maior preço 
                    foi <strong>{dados.maior_venda.produto_nome}</strong>. 
                    Foi <strong>uma</strong> peça vendida
                     por <strong>R$ {dados.maior_venda.valor}</strong>. No dia <strong>{this.formatar_data(dados.maior_venda.data)}</strong> </p>
                </div>)
            }
        }
        if(dados.melhor_dia !==0){
                this.dados.push(<div key={Math.random()} className="info">
                                    <p>O dia com mais vendas foi em <strong>{this.formatar_data(dados.melhor_dia.data)}</strong>. O dia fechou 
                                    com <strong>{dados.melhor_dia.Qtd}</strong> vendas</p>
                                </div>)
        }
        if(dados.maior_despesa !==0){
            this.dados.push(<div key={Math.random()} className="info">
                                <p>A maior dívida paga foi a de <strong>{dados.maior_despesa.descricao}</strong> de <strong>R$ {dados.maior_despesa.valor}</strong> no
                                 dia <strong>{this.formatar_data(dados.maior_despesa.data)}</strong></p>
                            </div>)
        }
    }
    componentDidMount(){
        var data = new Date()

        this.setState({ano: data.getFullYear()})
        this.setState({ano_pesquisa: data.getFullYear()})
        this.iniciar(String(data.getFullYear()))
        setTimeout(() =>  this.setState({isLoading: false}), 400);
    }
    iniciar(ano_){
        const {setpp_pagar, setpp_prazo, setpp_vencido, setsem_internet, seturlimage, setnome_user, setend_user, setemail_user, setnumero_user} = this.context
        Axios.post('index.php?url=financeiro/pesquisa', {user:'1', ano:ano_})
        .then(res => {
            var dados = res.data.data
            if(dados['recebido'] === null){
                this.setState({caixa:0})
            }
            else{
                this.setState({caixa: dados['recebido']})
            }
            if(dados['situacao'] === "Usuário não autenticado"){
                Exit()
            }
            else{
                if(dados['foto_perfil'] !== ''&& dados['foto_perfil'] !== null)
                    {seturlimage(Server+dados['foto_perfil']) 
                }
                setnome_user(dados['nome'])
                setend_user(dados['endereco'])
                setemail_user(dados['email'])
                setnumero_user(dados['telefone'])  
                this.criar_avisos(dados['notificacao'])
                this.setState({nome: dados['nome']})
                this.setState({faturamento: dados['recebido']})
                this.setState({despesas: dados['despesas']})
                this.setState({saldo: dados['recebido']- dados['despesas']})
                if(dados['recebido']- dados['despesas'] <0){
                    this.setState({s: 'box negativo'})
                }
                else{
                    this.setState({s: 'box saldo'})
                }
                if(res.data.data[3] === "Aberto"){
                    var data = dados['data_vencimento'].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        setpp_prazo("popup-prazo mostrar")
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
            console.log(er)
            setsem_internet("sem-internet mostrar")
        })
    }
    pesquisa(){
        this.setState({loading: "loading mostrar"})
        this.setState({ano: String(this.state.ano_pesquisa)})
        this.iniciar(String(this.state.ano_pesquisa))
        setTimeout(()=> this.setState({loading: "loading"}), 2000)
    }
    render(){
        return(this.state.isLoading? <Loading></Loading> :
            <div className="tudo">
                <Loading1 loading={this.state.loading}></Loading1>
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <div className="blocos-financeiro">
                        <div className="box">
                            <h2 className="receita">R$ {this.state.faturamento.toFixed(2)}</h2>
                            <h1>Recebido em {this.state.ano}</h1>
                        </div>
                        <div className="box">
                            <h2 className="despesas">R$ {this.state.despesas.toFixed(2)}</h2>
                            <h1 >Despesas  em {this.state.ano}</h1>
                        </div>
                        <div className={this.state.s}>
                            <h2 className="saldo">R$ {this.state.saldo.toFixed(2)}</h2>
                            <h1>Saldo {this.state.ano}</h1>
                        </div>
                        <Relogio></Relogio>
                        <div className="notific">
                            <div className="pesquisa">
                                <h3>ANO</h3>
                                <select value={this.state.ano_pesquisa} onChange={(event) => this.setState({ano_pesquisa: event.target.value})}>
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
                                <button onClick={(event) => this.pesquisa()}>PESQUISAR</button>
                            </div>
                            <h2>Informações gerais:</h2>
                            {this.dados}
                        </div>
                    </div>
                </LadoDireito>
            </div>
        )
    }
}

