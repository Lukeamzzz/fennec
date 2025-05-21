import { Quote } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
  }
  
  const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => {
    return (
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg hover:scale-103 duration-300">
        <div className="text-orange-500 text-6xl mb-3">
            <Quote />
        </div>

        <p className="text-gray-700 italic mb-5">{quote}</p>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;