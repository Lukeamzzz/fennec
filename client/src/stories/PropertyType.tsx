import React from "react";
import { LandPlot, Home, Building, Compass } from "lucide-react";

interface PropertyTypeIconProps {
  /**
   * Specifies the type of property icon to display.
   * Accepted values (case-insensitive): 'Casa', 'Departamento', 'Terreno'.
   * Defaults to a generic 'Propiedad' icon if an invalid type is provided.
   */
  iconType: string;
  /** Defines the size of the icon to be rendered. */
  size: number;
}

/**
 * Renders an icon and accompanying text based on the provided property type.
 * This component uses icons from the 'lucide-react' library.
 */
const PropertyTypeIcon: React.FC<PropertyTypeIconProps> = ({
  iconType,
  size,
}) => {
  /*
        Determines the appropriate icon and text based on the 'iconType' prop.
        It returns an object containing the 'Icon' component from 'lucide-react' and the corresponding `text`.
    */
  const getIcon = () => {
    switch (iconType.toLowerCase()) {
      case "casa":
        return { Icon: Home, text: "Casa" };
      case "departamento":
        return { Icon: Building, text: "Departamento" };
      case "terreno":
        return { Icon: LandPlot, text: "Terreno" };
      default:
        return { Icon: Compass, text: "Propiedad" };
    }
  };

  const { Icon, text } = getIcon();

  return (
    <div className="flex items-center text-center">
      <Icon size={size} />
      <p className="pl-2">{text}</p>
    </div>
  );
};

export default PropertyTypeIcon;
