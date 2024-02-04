import { useState } from "react";
import ThemeController from "./ThemeController";
import DropdownPropiedades from "./DropdownPropiedades";

export default function Nav() {
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
        <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
                <details className="dropdown">
                    <summary tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </summary>
                    <DropdownPropiedades propiedades={propiedades}/>
                </details>
                <a className="btn btn-ghost text-xl" href="#inicio">
                <img class="h-10 w-10 rounded" src="./favicon.ico" alt="BAF Bienes Raices"/>
                    BAF Bienes Raices
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <DropdownPropiedades propiedades={propiedades}/>
            </div>
            <div className="navbar-end">
                <ThemeController />
            </div>
        </div>
    );
}