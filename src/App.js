import { useState } from 'react';

import './App.css';
import Nav from './components/nav/Nav';
import Publicacion from './components/Publicacion'
import Header from './components/Header';

function App() {

  const [propiedades, setPropiedades] = useState(
    [
        {
            name: 'Propiedad Barrio Fátima Garupá',
        },
        {
            name: 'Propiedad Barrio Aguacates Posadas',
        },
        {
            name: 'Departamento en Zona centrica Posadas Misiones',
        },
        {
            name: 'Propiedad Entre rios',
        },
        {
            name: 'Propiedad Garupa Zona centrica',
        },
        {
            name: 'Lotes en Candelaria Misiones',
        },
        {
            name: 'Propiedad Jardin America',
        },
        {
            name: 'Propiedad tipo Chalet Zona centrica San Vicente',
        },
        {
            name: 'Propiedad con terreno en Zona centrica San Vicente',
        },
        {
            name: 'Lote de 2 Hectareas Eldorado Misiones',  
        },
    ]
);

  return (
    <div className="App">
      <Nav propiedades={propiedades} />
      <Header />
    </div>
  );
}

export default App;
