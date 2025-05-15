import React from "react";
import { FileText } from "lucide-react";

interface PreviewProps {
  /**
   * The title of the preview.
   */
  title: string;
  /**
   * The description of the preview.
   */
  description: string;
  /**
   * The icon of the preview.
   */
  icon?: React.ElementType;
}

/**
 * The preview component.
 */
const Preview: React.FC<PreviewProps> = ({
  title,
  description,
  icon: Icon = FileText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-slate-100 rounded-lg p-8 text-center">
      <Icon size={64} className="mb-6 text-slate-400" strokeWidth={1.5} />
      <h3 className="text-2xl font-semibold text-slate-700 mb-3">{title}</h3>
      <p className="text-base text-slate-500 max-w-md leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Preview;
