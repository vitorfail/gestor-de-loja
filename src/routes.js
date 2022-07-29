import React from "react";
import Home from "./pages/Home/Home"
import Caixa from "./pages/Caixa/Caixa";
import Estoque from "./pages/Estoque/Estoque";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import StoreProvider from './componentes/Store/Provider';
import RoutesPrivate from "./componentes/Routes/Private";
import Login from "./pages/Login/Login";
const Rout = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route  exact path="/" component={Home}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/caixa" component={Caixa}/>
        <Route  exact path="/estoque" component={Estoque}/>
      </Switch>
    </StoreProvider>
  </ BrowserRouter>
);
export default Rout;