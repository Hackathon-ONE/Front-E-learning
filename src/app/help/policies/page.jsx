"use client"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-6">
        En <strong>[Nombre de la Plataforma]</strong>, valoramos y respetamos tu
        privacidad. Esta Política de Privacidad describe cómo recopilamos,
        usamos y protegemos tu información personal cuando utilizas nuestra
        plataforma de aprendizaje en línea.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Información que recopilamos</h2>
        <p>
          Recopilamos la información que nos proporcionas directamente al
          registrarte, como tu nombre, correo electrónico, contraseña y datos de
          facturación si aplican. También recopilamos información de uso,
          incluyendo interacciones con los cursos, evaluaciones y actividades
          dentro de la plataforma.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Uso de la información</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Brindar acceso a los cursos y funcionalidades de la plataforma.</li>
          <li>Personalizar tu experiencia de aprendizaje.</li>
          <li>Procesar pagos y generar comprobantes.</li>
          <li>Mejorar continuamente nuestros servicios.</li>
          <li>Comunicarnos contigo con fines administrativos o promocionales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Compartición de la información</h2>
        <p>
          No compartimos tu información personal con terceros sin tu
          consentimiento, excepto cuando sea necesario para:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cumplir con la ley o procesos legales.</li>
          <li>Proteger los derechos y seguridad de los usuarios y de la plataforma.</li>
          <li>Proveedores de servicios que apoyan nuestro funcionamiento (ej.
          hosting, pasarelas de pago), bajo estrictos acuerdos de confidencialidad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Seguridad de los datos</h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para
          proteger tu información personal contra accesos no autorizados, pérdida
          o alteración. Sin embargo, ningún sistema es completamente seguro, y no
          podemos garantizar una seguridad absoluta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Derechos del usuario</h2>
        <p>
          Tienes derecho a acceder, actualizar o eliminar tu información personal
          en cualquier momento desde tu perfil. También puedes contactarnos para
          ejercer tus derechos de acuerdo con la normativa de protección de datos
          aplicable en tu país.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta Política de Privacidad ocasionalmente para
          reflejar cambios en nuestras prácticas o en la normativa vigente. Te
          notificaremos sobre cambios importantes a través de la plataforma o por
          correo electrónico.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">7. Contacto</h2>
        <p>
          Si tienes dudas sobre esta Política de Privacidad, puedes escribirnos
          a: <a href="mailto:soporte@tuplataforma.com" className="text-primary">soporte@tuplataforma.com</a>
        </p>
      </section>
    </main>
  );
}