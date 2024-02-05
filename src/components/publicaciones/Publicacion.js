import CarruselPropiedad from "./CarruselPropiedad";

export default function Publicacion({ title }) {
    return (

<article className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{title} </h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">{`Mas Informacion >`}</button>
    </div>
  </div>
</article>



    );
}