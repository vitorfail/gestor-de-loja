import React from "react";
import Rout from "./routes";
import PopupPagar from "./componentes/PopupPagar/PopupPagar";
import PopupPrazo from "./componentes/PopupPrazo/PopupPrazo";
import PopupVencido from "./componentes/PopupVencido/PopupVencido";
import SemInternet from "./componentes/SemInternet/SemInternet";
import PopupImagem from "./componentes/PopupImagem/PopupImagem";
import PopupCalculadora from "./componentes/PopupCalculadora/PopupCalculadora";
import PopupEditar from "./componentes/PopupEditar/PopupEditar";

function App(){
    return(
        <div>
            <PopupPagar ></PopupPagar>
            <PopupPrazo ></PopupPrazo>
            <PopupVencido ></PopupVencido>
            <SemInternet ></SemInternet>
            <PopupImagem></PopupImagem>
            <PopupCalculadora></PopupCalculadora>
            <PopupEditar></PopupEditar>
            <Rout />
        </div>
    )
} 
export default App;
