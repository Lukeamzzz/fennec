import React from "react";
import { Eye, Download } from "lucide-react";

interface Report {
  id: string | number;
  name: string;
  date: string;
  type: string;
  size: string;
  onPreview: (id: string | number) => void;
  onDownload: (id: string | number) => void;
}

interface ReportContentProps {
  /**
   * The title of the report content.
   */
  title: string;
  /**
   * The subtitle of the report content.
   */
  subtitle: string;
  /**
   * The reports of the report content.
   */
  reports: Report[];
}
/**
 * The report content component.
 */
const ReportContent: React.FC<ReportContentProps> = ({
  title,
  subtitle,
  reports,
}) => {
  const handlePreview = (id: string | number) => {
    console.log(`Preview report ${id}`);

    const report = reports.find((r) => r.id === id);
    if (report?.onPreview) {
      report.onPreview(id);
    }
  };

  const handleDownload = (id: string | number) => {
    console.log(`Download report ${id}`);

    const report = reports.find((r) => r.id === id);
    if (report?.onDownload) {
      report.onDownload(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-lg text-gray-500">{subtitle}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre del Informe
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Tamaño
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {report.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  {report.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  {report.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  {report.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  <div className="flex items-center space-x-5">
                    <button
                      onClick={() => handlePreview(report.id)}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                      aria-label={`Previsualizar ${report.name}`}
                    >
                      <Eye size={18} className="mr-1.5" />
                      <span>Previsualizar</span>
                    </button>
                    <button
                      onClick={() => handleDownload(report.id)}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                      aria-label={`Descargar ${report.name}`}
                    >
                      <Download size={18} className="mr-1.5" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportContent;
