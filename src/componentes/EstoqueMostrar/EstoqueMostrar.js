import React from "react"
import { useState } from "react";
import "./EstoqueMostrar.css";
import Editar from "../../icons/editar.png";
import Excluir from "../../icons/excluir.png";

function EstoqueMostrar(){
    return(
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
            </div>
        </div>
    )
}
export default EstoqueMostrar