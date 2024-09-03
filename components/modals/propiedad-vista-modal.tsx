import { normalizeTitle } from "@/lib/utils";
import Image from "next/image";

export default function PropiedadVistaModal({propiedad, img, index}) {
return (
    <div>
        <label htmlFor={`propiedad-${propiedad.id}-img-${index}`} className="btn">
            <Image
                src={`/_static/images/propiedades/${normalizeTitle(propiedad.title)}/${img}`}
                alt={`${normalizeTitle(propiedad.title)}-${index}`}
                width={200}
                height={200}
                className="min-w-fit rounded-lg shadow-2xl md:block"
            />
        </label>
        <input type="checkbox" id={`propiedad-${propiedad.id}-img-${index}`} className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box flex justify-center flex-col items-center gap-5">
                <h3 className="text-lg font-bold">Vista previa</h3>
                <Image
                    src={`/_static/images/propiedades/${normalizeTitle(propiedad.title)}/${img}`}
                    alt={`${normalizeTitle(propiedad.title)}-${index}`}
                    width={500}
                    height={500}
                    className="min-w-2xl rounded-lg shadow-2xl md:block"
                />
                <div className="modal-action">
                    <label htmlFor={`propiedad-${propiedad.id}-img-${index}`} className="btn">Cerrar</label>
                </div>
            </div>
        </div>
    </div>
)}