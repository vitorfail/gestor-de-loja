import "./CaixaMostra.css";

function CaixaMostra(){
    return(
        <div className="mostrar-caixa">
            <div className="tabela">
                <div className="titulo">
                    <h3 className="descricao">Descrição</h3>
                    <h3>Valores</h3>
                </div>
                <div className="entrada">
                    <div className="descri">
                        <h3>Roupa</h3>
                    </div>
                    <div className="valor">
                        <h3>R$ 43,00</h3>
                    </div>
                </div>
                <div className="saida">
                    <div className="descri">
                        <h3>Papel</h3>
                    </div>
                    <div className="valor">
                        <h3>- R$ 13,00</h3>
                    </div>
                
                </div>
            </div>
        </div>
    )
}
export default CaixaMostra