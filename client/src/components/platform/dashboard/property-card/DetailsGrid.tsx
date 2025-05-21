
interface DetailsGridProps {
    price: number;
    size: number;
    bathrooms: number;
    bedrooms: number;
}

function DetailsGrid({ price, size, bedrooms, bathrooms }: DetailsGridProps) {
    return (
        <div className="px-6 py-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
                <span className="block text-gray-500">Precio</span>
                <span className="font-semibold">${price.toLocaleString()}</span>
            </div>
            <div>
                <span className="block text-gray-500">Tamaño</span>
                <span className="font-semibold">{size} m²</span>
            </div>
            <div>
                <span className="block text-gray-500">Cuartos</span>
                <span className="font-semibold">{bedrooms}</span>
            </div>
            <div>
                <span className="block text-gray-500">Baños</span>
                <span className="font-semibold">{bathrooms}</span>
            </div>
        </div>
    );
}
 export default DetailsGrid;