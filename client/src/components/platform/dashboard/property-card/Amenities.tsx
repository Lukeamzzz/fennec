export default function Amenities({ amenities, investmentGrade, phone }) {
    return (
        <>
            <div className="px-6 py-4 border-t">
                <h4 className="font-medium text-gray-700 mb-2">Amenidades</h4>
                <ul className="flex flex-wrap gap-2">
                    {amenities.map((a, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{a}</span>
                    ))}
                </ul>
            </div>
            <div className="px-6 py-4 border-t flex flex-col md:flex-row items-center justify-between">
                <div>
                    <span className="text-gray-500">Grado de inversión:</span>
                    <span className="font-semibold ml-2">{investmentGrade}</span>
                </div>
                <a href={`tel:${phone}`} className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                   Contacta con un inversor
                </a>
            </div>
        </>
    );
}
