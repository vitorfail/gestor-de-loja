import React, { Component } from "react";
import "./Estoque.css"; 
import Lateral from "../../componentes/Lateral/Lateral";
import LadoDireito from "../../componentes/LadoDireito/LadoDireito";
import Conteudo from "../../componentes/Conteudo/Conteudo";
import BarraSuperior from "../../componentes/BarraSuperior/BarraSuperior"
import BlocosEstoque from "../../componentes/BlocosEstoque/BlocosEstoque";
import EstoqueMostrar from "../../componentes/EstoqueMostrar/EstoqueMostrar";
import Axios from "../../Axios";
import Exit from '../../Exit'
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";

export default class Estoque extends Component{
    constructor(){
        super()
        this.lista =[];
        this.state = {
            estoque_valor: '',
            dias: '',
            nome:'',
            vencimento:'',
            dados:[],
        }
        this.iniciar= this.iniciar.bind(this)
        this.mostrar_estoque = this.mostrar_estoque.bind(this)

    }
    componentDidMount(){
        this.iniciar()
    }
    mostrar_estoque(props){
        var data = props
        console.log(data)
        if(data === '1' || data === 'Usuário não autenticado'){
            Exit()
        }
        else{
            
            for(var i=0; i< 15; i++){
                var custo = parseFloat(data[i]["produto_valor"])

                var percentual = parseInt(data[i]["percentual"].replace('%', ''))
                var preco = custo +(custo *(percentual/100))
               this.lista.push( <div  key={data[i]['id']+data[i]["produto-nome"]} className="entrada">
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
                            <button><img src={Editar}/></button>
                        </div>
                        <div className="excluir-2">
                            <button><img src={Excluir}/></button>
                        </div>
                    </div>)
            }
            return this.lista
        }
    }
    iniciar(){
        Axios.post('index.php?url=estoque/pesquisa', {user:'1', index: 0, tamanho:15})
        .then(res => {
            
            if(res.data.data[1] === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.setState({dados: this.mostrar_estoque(res.data.data[1])})
                if(res.data.data[3] === "Pago"){
                    this.setState({estoque_valor:res.data.data[0] })
                    this.setState({nome: res.data.data[2]})
                }
                if(res.data.data[3] === "Aberto"){
                    var data = res.data.data[4].split('-');
                    var data_vencimento = new Date(parseInt(data[0]), parseInt(data[1])-1, parseInt(data[2]))
                    var data_hoje = new Date();
                    var diferenca = data_vencimento - data_hoje 
                    var dif = diferenca / (1000 * 60 * 60 * 24);
                    if(dif>0 && dif<7){
                        this.setState({estoque_valor:res.data.data[0] })
                        this.setState({dias: Math.round(dif)})
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                    }
                    if(dif>7){
                        this.setState({dias: Math.round(dif)})
                        this.setState({estoque_valor:res.data.data[0] })
                        this.setState({nome: res.data.data[2]})
                        this.setState({vencimento: 'prazo'})
                    }
                    else{
                        if(dif<0 && dif>-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque_valor:res.data.data[0] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                        }
                        if(dif<-5){
                            this.setState({dias: Math.round(dif)})
                            this.setState({estoque_valor:res.data.data[0] })
                            this.setState({nome: res.data.data[2]})
                            this.setState({vencimento: 'vencido'})
                        }
                    }
                }
            }
        })
    }
    render(){
        return(
            <div className="tudo">
                <Lateral dias={this.state.dias} nome={this.state.nome} vencimento={this.state.vencimento} ></Lateral>
                <LadoDireito>
                    <BarraSuperior></BarraSuperior>
                    <Conteudo>
                        <BlocosEstoque></BlocosEstoque>
                        <EstoqueMostrar conteudo={this.state.dados}></EstoqueMostrar>
                    </Conteudo>
                    
                </LadoDireito>
            </div>
        )
    }
}

