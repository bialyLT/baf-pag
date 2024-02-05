import Publicacion from "./Publicacion";


export default function Publicaciones({ propiedades }) {
    
    return (

        <section>
            <h1 className="text-4xl font-bold">
                Propiedades en Venta
            </h1>
            <h2>
            { propiedades.map((p,i) =>  <Publicacion title={p.name} key={i}/> )}
            </h2>
        </section>


    )
}