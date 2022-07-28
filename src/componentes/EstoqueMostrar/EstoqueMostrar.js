import React from "react"
import { useState } from "react";
import "./EstoqueMostrar.css";
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";
import PopupEstoque from "../PopupEstoque/PopupEstoque";

function EstoqueMostrar(){
    const [mostrar, setmostrar] = useState("popup-estoque")
    return(
        <div className="mostrar-estoque">
            <PopupEstoque exibir={mostrar}></PopupEstoque>
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
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Roupa</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>300</h3>
                    </div>
                    <div className="custo-2">
                        <h3>300</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Roupa</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>300</h3>
                    </div>
                    <div className="custo-2">
                        <h3>300</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Roupa</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>300</h3>
                    </div>
                    <div className="custo-2">
                        <h3>300</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Saia</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>10</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 10,77</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Bermuda</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>20</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 50.00</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 60,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Calça jeans</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>20</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 40,00</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Roupa infantil</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>40</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 20,00</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Calcinha tamanho 20</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>145</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 45,00</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>
                <div className="entrada">
                    <div className="descri-2">
                        <h3>Roupa intima masculina tamnho 30m</h3>
                    </div>
                    <div className="qtd-2">
                        <h3>80</h3>
                    </div>
                    <div className="custo-2">
                        <h3>R$ 12,00</h3>
                    </div>
                    <div className="lucro-2">
                        <h3>13%</h3>
                    </div>
                    <div className="preco-2">
                        <h3>R$ 43,00</h3>
                    </div>
                    <div className="editar-2">
                        <button><img src={Editar}/></button>
                    </div>
                    <div className="excluir-2">
                        <button><img src={Excluir}/></button>
                    </div>
                </div>

            </div>
            <div className="botoes">
                <button className="add" onClick={(event) => setmostrar("popup-estoque mostrar")}>Adicionar</button>
                <button className="del">Excluir</button>
            </div>
        </div>
    )
}
export default EstoqueMostrar