"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ValuationReport {
  id: string;
  direccion: string;
  colonia?: string;
  alcaldia?: string;
  codigoPostal: string;
  tipoPropiedad: string;
  valorEstimado: number;
  fechaCreacion: string;
  habitaciones?: number;
  bathrooms?: number;
  tamanoPropiedad: number;
  condicion: string;
  anotaciones_valuacion?: string;
}

export default function Reports() {
  const [reports, setReports] = useState<ValuationReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ValuationReport | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  // Simular datos de ejemplo (reemplazar con llamada real a API)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Aquí harías la llamada real a tu API
        // const response = await fetch('/api/valuation-reports');
        // const data = await response.json();

        // Datos de ejemplo para mostrar la interfaz
        const mockData: ValuationReport[] = [
          {
            id: "1",
            direccion: "Av. Insurgentes Sur 1234",
            codigoPostal: "03100",
            tipoPropiedad: "Departamento",
            valorEstimado: 3500000,
            fechaCreacion: "2024-03-15T10:30:00Z",
            habitaciones: 3,
            bathrooms: 2,
            tamanoPropiedad: 120,
            condicion: "Buena",
            anotaciones_valuacion:
              "Departamento en excelente ubicación con vista panorámica. Cuenta con acabados de primera calidad, cocina integral, closets empotrados y balcón amplio. Edificio con amenidades: gimnasio, roof garden y seguridad 24 horas. Estacionamiento techado incluido.",
          },
          {
            id: "2",
            direccion: "Calle Roma Norte 456",
            codigoPostal: "06700",
            tipoPropiedad: "Casa",
            valorEstimado: 8750000,
            fechaCreacion: "2024-03-12T14:20:00Z",
            habitaciones: 4,
            bathrooms: 3,
            tamanoPropiedad: 250,
            condicion: "Excelente",
            anotaciones_valuacion:
              "Casa completamente remodelada con diseño contemporáneo. Pisos de madera en planta alta, cocina italiana con isla central, jardín privado con asador. Sistema de calefacción, paneles solares y cisterna de 10,000 litros. Zona muy cotizada de la Roma Norte.",
          },
          {
            id: "3",
            direccion: "Polanco Reforma 789",
            codigoPostal: "11560",
            tipoPropiedad: "Departamento",
            valorEstimado: 6200000,
            fechaCreacion: "2024-03-10T09:15:00Z",
            habitaciones: 2,
            bathrooms: 2,
            tamanoPropiedad: 95,
            condicion: "Muy Buena",
            anotaciones_valuacion:
              "Departamento de lujo en Polanco con vista al Parque Lincoln. Acabados premium, mármol en baños, cocina con electrodomésticos europeos. Building de gran prestigio con conserje, valet parking y spa. Ubicación privilegiada a 2 cuadras de Presidente Masaryk.",
          },
        ];

        setReports(mockData);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los reportes");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleViewDetails = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Informes de Valuación
          </h1>
          <p className="mt-2 text-gray-600">
            Aquí puedes ver todos los reportes de valuación que has generado
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Reportes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {reports.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Valor Promedio
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {reports.length > 0
                      ? formatCurrency(
                          reports.reduce(
                            (sum, report) => sum + report.valorEstimado,
                            0
                          ) / reports.length
                        )
                      : "$0"}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a4 4 0 118 0v4m-4 6v6m0 0v3m0-3h.01M12 14h.01"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Último Reporte
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {reports.length > 0
                      ? new Date(
                          Math.max(
                            ...reports.map((r) =>
                              new Date(r.fechaCreacion).getTime()
                            )
                          )
                        ).toLocaleDateString("es-MX")
                      : "N/A"}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay reportes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza creando tu primer reporte de valuación.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Property Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {report.tipoPropiedad}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(report.fechaCreacion)}
                    </span>
                  </div>

                  {/* Address */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {report.direccion}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    CP: {report.codigoPostal}
                  </p>

                  {/* Property Details */}
                  {report.tipoPropiedad !== "Terreno" && (
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {report.habitaciones || 0}
                        </div>
                        <div className="text-gray-500">Recámaras</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {report.bathrooms || 0}
                        </div>
                        <div className="text-gray-500">Baños</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {report.tamanoPropiedad}
                        </div>
                        <div className="text-gray-500">m²</div>
                      </div>
                    </div>
                  )}

                  {/* Estimated Value */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Valor Estimado
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(report.valorEstimado)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-2">Condición</p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            report.condicion === "Excelente"
                              ? "bg-green-100 text-green-800"
                              : report.condicion === "Muy Buena"
                              ? "bg-blue-100 text-blue-800"
                              : report.condicion === "Buena"
                              ? "bg-yellow-100 text-yellow-800"
                              : report.condicion === "Regular"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {report.condicion}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleViewDetails(report.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para mostrar anotaciones de valuación */}
      <AnimatePresence>
        {showModal && selectedReport && (
          <motion.div
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header del Modal */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Reporte de Valuación
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {selectedReport.direccion}
                    </p>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Información de la propiedad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Dirección
                      </h3>
                      <p className="text-lg text-gray-900">
                        {selectedReport.direccion}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Código Postal
                      </h3>
                      <p className="text-lg text-gray-900">
                        {selectedReport.codigoPostal}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Tipo de Propiedad
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        {selectedReport.tipoPropiedad}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Condición
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          selectedReport.condicion === "Excelente"
                            ? "bg-green-100 text-green-800"
                            : selectedReport.condicion === "Muy Buena"
                            ? "bg-blue-100 text-blue-800"
                            : selectedReport.condicion === "Buena"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedReport.condicion === "Regular"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedReport.condicion}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Valor Estimado
                      </h3>
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(selectedReport.valorEstimado)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Fecha de Creación
                      </h3>
                      <p className="text-lg text-gray-900">
                        {formatDate(selectedReport.fechaCreacion)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        Tamaño
                      </h3>
                      <p className="text-lg text-gray-900">
                        {selectedReport.tamanoPropiedad} m²
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Detalles de la propiedad */}
                {selectedReport.tipoPropiedad !== "Terreno" && (
                  <motion.div
                    className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedReport.habitaciones || 0}
                      </div>
                      <div className="text-sm text-gray-500">Recámaras</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedReport.bathrooms || 0}
                      </div>
                      <div className="text-sm text-gray-500">Baños</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedReport.tamanoPropiedad}
                      </div>
                      <div className="text-sm text-gray-500">m²</div>
                    </div>
                  </motion.div>
                )}

                {/* Anotaciones de Valuación */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Análisis de Valuación
                  </h3>
                  <motion.div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    whileHover={{
                      backgroundColor: "#dbeafe",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedReport.anotaciones_valuacion ||
                        "No hay anotaciones de valuación disponibles para este reporte."}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Botones de acción */}
                <motion.div
                  className="flex justify-end space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <motion.button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Cerrar
                  </motion.button>
                  <motion.button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                    whileHover={{
                      backgroundColor: "#ea580c",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Imprimir Reporte
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
