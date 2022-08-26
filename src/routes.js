import React from "react";
import Home from "./pages/Home/Home"
import Caixa from "./pages/Caixa/Caixa";
import Estoque from "./pages/Estoque/Estoque";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import RoutesPrivate from "./componentes/Routes/Private";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Check from "./pages/Check/Check";
import Financeiro from "./pages/Financeiro/Financeiro";
const Rout = () => (
  <BrowserRouter>
      <Switch>
        <RoutesPrivate  exact path="/" component={Home}/>
        <Route  exact path="/login" component={Login}/>
        <Route path="/check/:code" component={Check}/>
        <Route  exact path="/registro" component={Registro}/>
        <RoutesPrivate  exact path="/financeiro" component={Financeiro}/>
        <RoutesPrivate  exact path="/caixa" component={Caixa}/>
        <RoutesPrivate  exact path="/estoque" component={Estoque}/>
      </Switch>
  </ BrowserRouter>
);
export default Rout;