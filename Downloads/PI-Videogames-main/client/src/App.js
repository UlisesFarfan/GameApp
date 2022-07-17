import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Inicio from "./components/Carga/Inicio.jsx"
import Home from './components/Home/Home';
import Detail from './components/Detalles/Detail';
import Create from './components/CrearJuego/Create'

function App() {
  return (
    <React.Fragment >
      <Route path={["/home" , "/create", "/detail"]} component={ Nav } />
      <Route exact path="/" component={ Inicio } />
      <Route exact path="/home" component={ Home } />
      <Route exact path="/detail" component={ Detail } />
      <Route exact path="/create" component={ Create } />
    </React.Fragment>
  );
}

export default App;
