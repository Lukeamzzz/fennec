export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">Fecha de entrada en vigor: 4-06-2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introducción</h2>
        <p>
          En Fennec, reconocemos la importancia de proteger los datos personales de nuestros usuarios.
          Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tu información personal
          cuando usas nuestra plataforma para análisis y predicción del valor inmobiliario en México.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Información que Recopilamos</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Información personal:</strong> nombre, correo electrónico, teléfono, datos de facturación.</li>
          <li><strong>Información técnica:</strong> dirección IP, navegador, cookies.</li>
          <li><strong>Datos de uso:</strong> historial de búsquedas, propiedades consultadas.</li>
          <li><strong>Información derivada:</strong> valoraciones predictivas y recomendaciones.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Finalidades del Tratamiento</h2>
        <p>Utilizamos tu información para:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Proveer acceso a la plataforma.</li>
          <li>Generar reportes y dashboards personalizados.</li>
          <li>Ejecutar modelos predictivos inmobiliarios.</li>
          <li>Cumplir obligaciones legales y prevenir fraudes.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Fundamento Legal</h2>
        <p>
          El tratamiento de datos se realiza conforme a la Ley Federal de Protección de Datos Personales en Posesión
          de los Particulares (LFPDPPP) y normativas aplicables en México.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Compartición de Datos</h2>
        <p>Fennec no transfiere tus datos personales salvo en casos específicos como:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Proveedores de servicios tecnológicos.</li>
          <li>Requerimientos legales o judiciales.</li>
          <li>Consentimiento explícito del titular.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Seguridad de los Datos</h2>
        <p>
          Aplicamos cifrado, control de acceso, monitoreo y respaldos para proteger tus datos contra accesos no
          autorizados o pérdidas.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Derechos ARCO</h2>
        <p>
          Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) escribiéndonos a:
          <strong> [correo@fennec.mx] </strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Conservación de Datos</h2>
        <p>
          Conservamos tu información mientras seas usuario activo y durante el tiempo necesario para cumplir con
          obligaciones legales o contractuales.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Uso de Cookies</h2>
        <p>
          Usamos cookies para mejorar tu experiencia. Puedes gestionar su uso desde la configuración de tu navegador.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Cambios a esta Política</h2>
        <p>
          Nos reservamos el derecho de modificar esta política. Cualquier cambio será notificado en la plataforma o por correo.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">11. Contacto</h2>
        <p>
          Para dudas o solicitudes sobre tu privacidad, escríbenos a:
        </p>
        <ul className="list-none mt-2">
          <li><strong>Correo:</strong> correo@fennec.mx</li>
          <li><strong>Responsable:</strong> Gerardo Alavez Mejía</li>
        </ul>
      </section>
    </div>
  );
}
