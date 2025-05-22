export default function Amenities({ amenities, investmentGrade }) {
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
            <div className="px-6 py-4 border-t flex justify-end text-right">
                <div>
                    <span className="text-gray-500">Grado de inversión:</span>
                    <span className="font-semibold ml-2">{investmentGrade}</span>
                </div>
            </div>
        </>
    );
}
