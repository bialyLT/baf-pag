import bgImageHeader from '../assets/baf-header.jpg';
export default function Header() {
    return (


        <header className="hero min-h-screen bg-base">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={bgImageHeader} className="max-w-sm rounded-lg shadow-2xl" alt='header-img' />
                <div>
                    <h1 className="text-5xl font-bold">Bienvenido a BAF Bienes Raices!</h1>
                    <p className="py-6">Descubra el hogar de sus sueños con nosotros. Nuestra pasión es encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.</p>
                    <button className="btn btn-ghost">Ver Propiedades</button>
                </div>
            </div>
        </header>

    );
}