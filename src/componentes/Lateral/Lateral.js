import React from "react";
import "./Lateral.css";
import { Link } from "react-router-dom";
function Lateral(){
return(<div className="barralateral">
                <div className="user"> 
                    <div className="icon_user">
                    </div>
                    <h3>Vitor Manoel</h3>
                </div>
                <ul>
                    <Link className="li" to="/">Home</Link>
                    <Link className="li" to="/caixa">Caixa</Link>
                    <Link className="li" to="/estoque">Produtos</Link>
                    <Link className="li" to="/caixa">Contas</Link>
                </ul>
            </div>)
}
export default Lateral