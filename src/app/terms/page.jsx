"use client";

export default function TermsPage() {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Términos y Condiciones</h1>
          <p className="text-muted mb-8">
            Bienvenido/a a nuestra plataforma de aprendizaje en línea. 
            Al acceder o usar nuestros servicios, aceptas los términos 
            que se describen a continuación. Por favor, léelos con atención.
          </p>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">1. Aceptación de los términos</h2>
            <p>
              Al registrarte o usar nuestra plataforma, confirmas que 
              has leído, comprendido y aceptado estos Términos y Condiciones, 
              así como nuestra Política de Privacidad. 
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">2. Uso de la plataforma</h2>
            <p>
              Nuestra plataforma está diseñada para fines educativos. 
              Te comprometes a utilizar los servicios de forma legal, 
              respetuosa y sin infringir derechos de terceros.
            </p>
            <ul className="list-disc list-inside mt-3">
              <li>No copiar, distribuir o revender el contenido sin autorización.</li>
              <li>No usar la plataforma para fines fraudulentos.</li>
              <li>Respetar la convivencia en foros, chats y sesiones en vivo.</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">3. Registro y cuentas</h2>
            <p>
              Para acceder a ciertos cursos o funcionalidades, deberás 
              crear una cuenta. Es tu responsabilidad mantener la 
              confidencialidad de tu contraseña y el uso adecuado de tu perfil.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">4. Pagos y suscripciones</h2>
            <p>
              Algunos servicios son gratuitos, mientras que otros requieren pago. 
              Todos los precios se mostrarán antes de la compra y 
              estarán sujetos a impuestos aplicables. 
            </p>
            <p className="mt-2">
              No se realizarán reembolsos salvo en casos expresamente 
              establecidos en la política de cancelación.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">5. Propiedad intelectual</h2>
            <p>
              Todo el contenido (cursos, materiales, textos, imágenes, 
              software, logos, etc.) es propiedad de la plataforma o 
              de sus respectivos autores. Está prohibida su reproducción 
              sin autorización previa.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">6. Limitación de responsabilidad</h2>
            <p>
              No garantizamos que el uso de la plataforma sea ininterrumpido 
              o libre de errores. No somos responsables por daños indirectos, 
              pérdidas económicas o problemas derivados del mal uso del servicio.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">7. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en 
              cualquier momento. Los cambios se comunicarán a través 
              de la plataforma y entrarán en vigor inmediatamente.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">8. Contacto</h2>
            <p>
              Si tienes preguntas sobre estos términos, puedes escribirnos a:{" "}
              <a href="mailto:soporte@tusitio.com" className="text-primary underline">
                soporte@tusitio.com
              </a>
            </p>
          </section>
  
          <p className="text-sm text-muted mt-10">
            Última actualización: Agosto 2025
          </p>
        </div>
      </div>
    );
  }
  