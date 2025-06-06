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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    <!-- Header -->
    <div style="padding: 24px 32px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-bottom: 1px solid #dee2e6;">
        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #212529;">Reporte de Valuación</h1>
        <p style="margin: 0; color: #6c757d; font-size: 16px;">${report.direccion}</p>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">
        <!-- Main Info Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px;">
            <!-- Left Column -->
            <div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Dirección</label>
                    <p style="margin: 0; font-size: 16px; color: #212529; font-weight: 500;">${report.direccion}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Código Postal</label>
                    <p style="margin: 0; font-size: 16px; color: #212529; font-weight: 500;">${report.codigoPostal}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Tipo de Propiedad</label>
                    <span style="display: inline-block; background: #fff3cd; color: #856404; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${report.tipoPropiedad}</span>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Condición</label>
                    <span style="display: inline-block; background: #d1ecf1; color: #0c5460; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${report.condicion}</span>
                </div>
            </div>

            <!-- Right Column -->
            <div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Valor Estimado</label>
                    <p style="margin: 0; font-size: 32px; color: #28a745; font-weight: 700;">$${report.valorEstimado.toLocaleString("es-MX")}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Fecha de Creación</label>
                    <p style="margin: 0; font-size: 16px; color: #212529;">${report.fechaCreacion || new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #6c757d; margin-bottom: 4px; font-weight: 500;">Tamaño</label>
                    <p style="margin: 0; font-size: 16px; color: #212529; font-weight: 500;">${report.tamanoPropiedad} m²</p>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 48px; font-weight: 700; color: #212529; margin-bottom: 8px;">${report.habitaciones || 0}</div>
                <div style="font-size: 14px; color: #6c757d; font-weight: 500;">Recámaras</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 48px; font-weight: 700; color: #212529; margin-bottom: 8px;">${report.bathrooms || 0}</div>
                <div style="font-size: 14px; color: #6c757d; font-weight: 500;">Baños</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 48px; font-weight: 700; color: #212529; margin-bottom: 8px;">${report.tamanoPropiedad}</div>
                <div style="font-size: 14px; color: #6c757d; font-weight: 500;">m²</div>
            </div>
        </div>

        <!-- Analysis Section -->
        <div style="border-top: 1px solid #dee2e6; padding-top: 24px;">
            <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #212529;">Análisis de Valuación</h3>
            <div style="background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; color: #004085; font-size: 14px; font-weight: 500;">${report.anotaciones_valuacion || "Sin anotaciones."}</p>
            </div>
        </div>
    </div>
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
