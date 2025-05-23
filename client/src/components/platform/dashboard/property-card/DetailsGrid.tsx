interface DetailsGridProps {
    price: number;
    size: number;
    bathrooms: number;
    bedrooms: number;
    parking: number;
}

function DetailsGrid({ price, size, bedrooms, bathrooms, parking }: DetailsGridProps) {
    return (
        <div className="px-6 py-4 border-t grid grid-cols-3 gap-5 text-center">

            {/* Primera fila */}
            <div>
                <span className="block text-gray-500">Precio</span>
                <span className="font-semibold">${price.toLocaleString()}</span>
            </div>
            <div>
                <span className="block text-gray-500">Tamaño</span>
                <span className="font-semibold">{size} m²</span>
            </div>
            <div>
                <span className="block text-gray-500">Estacionamientos</span>
                <span className="font-semibold">{parking}</span>
            </div>

            {/* Segunda fila: más separación entre elementos */}
            <div className="md:col-span-3 flex justify-between mx-auto gap-10">
                <div className={"pr-10"}>
                    <span className="block text-gray-500">Baños</span>
                    <span className="font-semibold">{bathrooms}</span>
                </div>
                <div className={"pl-10"}>
                    <span className="block text-gray-500">Cuartos</span>
                    <span className="font-semibold">{bedrooms}</span>
                </div>
            </div>
        </div>

    );
}

export default DetailsGrid;