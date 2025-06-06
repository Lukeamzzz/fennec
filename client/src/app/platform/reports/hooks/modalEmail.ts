// hooks/useSendReportEmail.ts
import api from "@/services/api";

interface EmailPayload {
    firebaseUID: string;
    subject: string;
    message: string;
}

export const useSendReportEmail = () => {
    const sendReport = async (uid: string, email: string, report: any) => {
        const message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #f97316; ">Reporte de Valuación</h1>
      <p><strong>Dirección:</strong> ${report.direccion}</p>
      <p><strong>Código Postal:</strong> ${report.codigoPostal}</p>
      <p><strong>Tipo de Propiedad:</strong> ${report.tipoPropiedad}</p>
      <p><strong>Condición:</strong> ${report.condicion}</p>
      <p><strong>Valor Estimado:</strong> $${report.valorEstimado.toLocaleString("es-MX")}</p>
      <p><strong>Tamaño:</strong> ${report.tamanoPropiedad} m²</p>
      <p><strong>Recámaras:</strong> ${report.habitaciones || 0}</p>
      <p><strong>Baños:</strong> ${report.bathrooms || 0}</p>
      <h3>Notas:</h3>
      <p>${report.anotaciones_valuacion || "Sin anotaciones."}</p>
      </div>
    `;

        const payload: EmailPayload = {
            firebaseUID: uid,
            subject: email,
            message: message,
        };

        try {
            await api.post("/api/email", payload);
            return { success: true };
        } catch (err) {
            console.error("Error al enviar email:", err);
            return { success: false, error: err };
        }
    };

    return { sendReport };
};
