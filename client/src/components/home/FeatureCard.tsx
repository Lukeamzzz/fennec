import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-103 duration-300 space-y-3">
      <div className="w-13 h-13 bg-orange-100 rounded-full flex justify-center items-center">
        <Icon className="text-orange-600 size-7"/>
      </div>
      <h1 className="font-bold text-xl">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;