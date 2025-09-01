"use client";

export default function CookiePolicyPage() {
  const lastUpdatedDate = "1 de Agosto de 2025";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-background text-foreground">
      {/* Título principal */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">
        Política de Cookies
      </h1>
      <span className="text-sm text-gray-500 block mb-8 text-center">
        Última actualización: {lastUpdatedDate}
      </span>

      {/* Introducción */}
      <section className="mb-10 leading-relaxed">
        <p>
          En <strong>Lumina</strong>, utilizamos cookies y tecnologías similares
          para garantizar el correcto funcionamiento de nuestra plataforma,
          mejorar tu experiencia de aprendizaje y personalizar el contenido que
          ofrecemos. Esta política explica qué son las cookies, cómo las usamos
          y qué opciones tienes para gestionarlas.
        </p>
      </section>

      {/* ¿Qué son las cookies? */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          1. ¿Qué son las Cookies?
        </h2>
        <p className="leading-relaxed">
          Las cookies son pequeños archivos de texto que se almacenan en tu
          navegador o dispositivo cuando visitas un sitio web. Permiten que el
          sitio recuerde tus acciones y preferencias (como inicio de sesión,
          idioma o configuración de la interfaz) durante un período de tiempo,
          para que no tengas que reingresarlas cada vez que regreses.
        </p>
      </section>

      {/* Tipos de cookies */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          2. ¿Qué tipos de Cookies utilizamos?
        </h2>
        <ul className="list-disc list-inside space-y-3 leading-relaxed">
          <li>
            <strong>Cookies Esenciales:</strong> Son necesarias para el
            funcionamiento básico de la plataforma, como iniciar sesión o acceder
            a áreas seguras.
          </li>
          <li>
            <strong>Cookies de Rendimiento:</strong> Nos ayudan a entender cómo
            interactúan los usuarios con la plataforma y recopilan datos de uso
            de forma anónima.
          </li>
          <li>
            <strong>Cookies de Funcionalidad:</strong> Permiten recordar tus
            preferencias, como idioma o configuración personalizada.
          </li>
          <li>
            <strong>Cookies de Marketing (si aplica):</strong> Se usan para
            mostrar anuncios relevantes y medir la efectividad de campañas.{" "}
            <em>No utilizamos cookies de publicidad personalizada en Lúmina.</em>
          </li>
        </ul>
      </section>

      {/* Cookies de terceros */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          3. Cookies de Terceros
        </h2>
        <p className="leading-relaxed">
          Algunas cookies pueden ser establecidas por servicios de terceros que
          utilizamos en la plataforma (por ejemplo, Google Analytics o servicios
          de video). Estas cookies están bajo el control de los proveedores
          externos y se rigen por sus propias políticas.
        </p>
      </section>

      {/* Gestión de cookies */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          4. ¿Cómo gestionar tus Cookies?
        </h2>
        <p className="leading-relaxed">
          Puedes configurar tu navegador para aceptar o rechazar cookies, así
          como para eliminarlas de tu dispositivo. Ten en cuenta que, si decides
          deshabilitar ciertas cookies, algunas funciones de Lúmina podrían no
          estar disponibles o no funcionar correctamente.
        </p>
        <p className="mt-3 leading-relaxed">
          Para más información, visita{" "}
          <a
            href="https://www.aboutcookies.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium underline-offset-2"
          >
            aboutcookies.org
          </a>{" "}
          o revisa la configuración de privacidad de tu navegador.
        </p>
      </section>

      {/* Cambios */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          5. Cambios en esta Política
        </h2>
        <p className="leading-relaxed">
          Lúmina puede actualizar esta Política de Cookies en cualquier momento
          para reflejar cambios en nuestras prácticas o por motivos legales,
          regulatorios u operativos. Te notificaremos de cambios importantes
          mediante la plataforma o por correo electrónico.
        </p>
      </section>

      {/* Contacto */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">6. Contacto</h2>
        <p className="leading-relaxed">
          Si tienes dudas o preguntas sobre esta Política de Cookies, puedes
          contactarnos en:
        </p>
        <p className="font-medium mt-2">Email: cookies@lumina.com</p>
      </section>
    </div>
  );
}