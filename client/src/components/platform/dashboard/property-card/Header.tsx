import { MapPin } from 'lucide-react';

interface HeaderProps {
    name: string;
    location: string;
}

function Header({ name, location }: HeaderProps) {
    return (
        <div className="px-6 py-4">
            <h2 className="font-bold text-2xl">{name}</h2>
            <div className="flex items-center">
                <MapPin className="pr-2 text-sm text-gray-500" />
                <p className="text-sm text-gray-500">{location}</p>
            </div>
        </div>
    );
}

export default Header;
