import React from "react";
import Home from "./pages/Home/Home"
import Caixa from "./pages/Caixa/Caixa";
import Estoque from "./pages/Estoque/Estoque";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import StoreProvider from './componentes/Store/Provider';
import RoutesPrivate from "./componentes/Routes/Private";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
const Rout = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <RoutesPrivate  exact path="/" component={Home}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/registro" component={Registro}/>
        <RoutesPrivate  exact path="/caixa" component={Caixa}/>
        <RoutesPrivate  exact path="/estoque" component={Estoque}/>
      </Switch>
    </StoreProvider>
  </ BrowserRouter>
);
export default Rout;