import React from "react";
import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import StoreProvider from './componentes/Store/Provider';
import RoutesPrivate from "./componentes/Routes/Private";

const Rout = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route  exact path="/" component={Home}/>
      </Switch>
    </StoreProvider>
  </ BrowserRouter>
);
export default Rout;