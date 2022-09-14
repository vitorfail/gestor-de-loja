import React, { Component } from "react";
import "./Estoque.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import BlocosEstoque from "../../componentes/BlocosEstoque/BlocosEstoque";
import Axios from "../../Axios";
import Exit from '../../Exit'
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";
import PopupEstoque from "../../componentes/PopupEstoque/PopupEstoque"
import Loading from "../../componentes/Loading/Loading";
import Passador_final_esquerda from "../../icons/passar-final-esquerda.png"
import Passador_esquerda from "../../icons/passar-esquerda.png"
import Passador_direita from "../../icons/passar-direita.png"
import Passador_final_direita from "../../icons/passar-final-direita.png"
import Loading1 from "../../componentes/Loading1/Loading1";
import { Authcontext } from "../../componentes/Store/Context";
import Server from "../../Servidor";
import PopupEditar from "../../componentes/PopupEditar/PopupEditar";

export default class Estoque extends Component{
    constructor(){
        super()
        this.lista =[];
        this.state = {
            estoque_valor: 0,
            dias: '',
            nome:'',
            vencimento:'',
            dados:[],
            isLoading:true,
            loading: "loading",
            index:0,
            limite:false,
            id:'teste'
        }
        this.iniciar= this.iniciar.bind(this)
        this.mostrar_estoque = this.mostrar_estoque.bind(this)
        this.passador = this.passador.bind(this)
        this.editar_produto = this.editar_produto.bind(this)
    }
    static contextType = Authcontext
    passador(direcao){
        this.setState({loading: "loading mostrar"})
        var valor =this.state.index
        if(direcao === 'esquerda'){
            if(valor === 0){
                this.setState({loading: "loading"})
            }
            else{
                this.setState({index: valor-14})
                this.iniciar(valor-14)
                this.setState({limite: false})
                this.setState({loading: "loading"})
            }
        }
        if(direcao === 'direita'){
            if(this.state.limite === true){
                this.setState({loading: "loading"})
            }
            else{
                this.setState({index: valor+14})
                this.iniciar(valor+14)
                this.setState({loading: "loading"})
            }
        }
    }
    componentDidMount(){
        this.iniciar(0)
        setTimeout(() =>  this.setState({isLoading: false}), 400);
    }
    editar_produto(e){
        const {setpp_editar} = this.context
        this.setState({id:parseInt(e)})
        setpp_editar('popup-editar mostrar')
    }
    mostrar_estoque(props, custo_fixo){
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
                var custo = parseFloat(data[i]["produto_valor"]) + custo_fixo
                var percentual = parseInt(data[i]["percentual"].replace('%', ''))
                var preco = (custo +(custo *(percentual/100))).toFixed(2)
               this.lista.push(<div id={data[i]['id']} key={data[i]['id']+data[i]["produto-nome"]} className="entrada">
                        <div className="descri-2">
                            <h3>{data[i]["produto-nome"]}</h3>
                        </div>
                        <div className="qtd-2">
                            <h3>{data[i]["quantidade"]}</h3>
                        </div>
                        <div className="custo-2">
                            <h3>R$ {data[i]["produto_valor"]}</h3>
                        </div>
                        <div className="lucro-2">
                            <h3>{data[i]["percentual"]}</h3>
                        </div>
                        <div className="preco-2">
                            <h3>R$ {preco}</h3>
                        </div>
                        <div className="editar-2">
                            <button id={data[i]['id']} onClick={(e) => this.editar_produto(e.currentTarget .id)}><img alt="editar" src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button id={data[i]['id']}><img alt="editar" src={Excluir}/></button>
                        </div>
                    </div>)
            }
            this.setState({dados: this.lista})
        }
    }
    restart(){
        this.iniciar(0)
    }
    iniciar(inicio){
        const {setpp_pagar, setpp_prazo, setpp_vencido, setsem_internet, seturlimage, setnome_user, setend_user, setemail_user, setnumero_user} = this.context
        Axios.post('index.php?url=estoque/pesquisa', {user:'1', index: inicio, tamanho:15})
        .then(res => {
            var dados = res.data.data
            if(dados['descricao'] === "Usuário não autenticado"){
                Exit()
            }
            else{
                if(dados['foto_perfil'] !== '' && dados['foto_perfil'] !== null)
                    {seturlimage(Server+dados['foto_perfil']) 
                }
                setnome_user(dados['nome'])
                setend_user(dados['endereco'])
                setemail_user(dados['email'])
                setnumero_user(dados['telefone']) 
                this.mostrar_estoque(dados['descricao'],  dados['custo_fixo'])
                this.setState({estoque_valor:dados['valor_estoque'] })
                this.setState({nome: dados['nome']})
                if(dados['situacao'] === "Aberto"){
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
    render(){
        const { setpp_estoque} = this.context
        return(this.state.isLoading? <Loading></Loading> :
            <div className="tudo">
                <PopupEditar id={this.state.id}></PopupEditar>
                <Loading1 loading={this.state.loading}></Loading1>
                <PopupEstoque  reiniciar={this.restart.bind(this)}></PopupEstoque>
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosEstoque estoque={this.state.estoque_valor.toFixed(2)}></BlocosEstoque>
                        <div className="mostrar-estoque">
                            <div className="tabela">
                                <div className="titulo">
                                    <div  className="descricao">
                                        <h3>Nome</h3>
                                    </div>
                                    <div className="qtd">
                                        <h3>Quantidade</h3>
                                    </div>
                                    <div className="custo">
                                        <h3>Custo</h3>
                                    </div>
                                    <div className="lucro">
                                        <h3>Lucro(%)</h3>
                                    </div>
                                    <div className="preco">
                                        <h3>Preço</h3>
                                    </div>
                                    <div className="editar">
                                        <h3>Editar</h3>
                                    </div>
                                    <div className="excluir">
                                        <h3>Excluir</h3>
                                    </div>
                                </div>
                                {this.state.dados}
                            </div>
                            <div className="passadores">
                                <button onClick={(event) => this.passador('esquerda')}><img alt="Passador_final_esquerda" src={Passador_final_esquerda}/></button>
                                <button onClick={(event) => this.passador('esquerda')}><img alt="Passador_esquerda" src={Passador_esquerda}/></button>
                                <button onClick={(event) => this.passador('direita')}><img alt="Passador_direita" src={Passador_direita}/></button>
                                <button onClick={(event) => this.passador('direita')}><img alt="Passador_final_direita" src={Passador_final_direita}/></button>

                            </div>
                            <div className="botoes">
                                <button className="add" onClick={(event)=> setpp_estoque('popup-estoque mostrar')}>Adicionar</button>
                                <button className="del">Excluir</button>
                            </div>
                        </div>
                    </Conteudo>
                </LadoDireito>
            </div>
        )
    }
}

