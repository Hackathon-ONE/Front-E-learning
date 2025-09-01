export const knowledgeBase = [
    // Páginas principales
    {
      path: "/",
      keywords: ["inicio", "home", "principal", "qué es", "bienvenida", "lúmina"],
      title: "Página de Inicio",
      description: "Página principal de la plataforma de Lúmina.",
      response: "¡Bienvenido a Lúmina! Estoy aquí para ayudarte con cualquier duda que tengas sobre nuestra plataforma de aprendizaje en línea."
    },
    {
      path: "/about",
      keywords: ["sobre nosotros", "quienes somos", "nuestra misión", "equipo"],
      title: "Sobre Nosotros",
      description: "Conoce más sobre Lúmina y nuestro equipo.",
      response: "En la sección 'Sobre Nosotros' encontrarás información detallada sobre nuestra misión, visión y el equipo detrás de Lúmina. ¡Te invito a conocernos mejor!"
    },
    
    // Cursos
    {
      path: "/courses",
      keywords: ["cursos", "explorar cursos", "ver cursos", "catálogo", "cursos disponibles"],
      title: "Cursos Disponibles",
      description: "Explora los cursos disponibles en nuestra plataforma.",
      response: "Tenemos una amplia variedad de cursos disponibles para ti. Puedes explorarlos en la sección de Cursos, donde encontrarás opciones para todos los niveles e intereses."
    },
    /* {
      path: "/courses/[id]",
      keywords: ["detalles del curso", "información del curso", "temario", "contenido del curso"],
      title: "Detalles del Curso",
      description: "Información detallada sobre un curso específico.",
      response: "Cada curso tiene su propia página con información detallada, incluyendo el temario, duración, instructor y opiniones de otros estudiantes. ¿Hay algún curso en particular sobre el que te gustaría saber más?"
    }, */
    
    // Autenticación
    /* {
      path: "/auth/login",
      keywords: ["iniciar sesión", "login", "acceder", "ingresar"],
      title: "Iniciar Sesión",
      description: "Accede a tu cuenta de Lúmina.",
      response: "Para acceder a tu cuenta, simplemente ve a Iniciar Sesión e ingresa tus credenciales. ¿Necesitas ayuda para recordar tu contraseña?"
    },
    {
      path: "/auth/register",
      keywords: ["registrarse", "crear cuenta", "nuevo usuario", "registro"],
      title: "Registro",
      description: "Crea una nueva cuenta en Lúmina.",
      response: "¡Es genial que quieras unirte a Lúmina! El registro es rápido y sencillo. Solo necesitarás un correo electrónico y crear una contraseña segura."
    },
    {
      path: "/auth/forgot-password",
      keywords: ["recuperar contraseña", "olvidé mi contraseña", "restablecer contraseña"],
      title: "Recuperar Contraseña",
      description: "Restablece tu contraseña en caso de olvido.",
      response: "No te preocupes, podemos ayudarte a recuperar el acceso a tu cuenta. Te enviaremos un enlace a tu correo electrónico para que puedas crear una nueva contraseña segura."
    }, */
    
    // Panel de Usuario
    /* {
      path: "/dashboard",
      keywords: ["panel de control", "mi área", "resumen", "estadísticas"],
      title: "Panel de Control",
      description: "Vista general de tu actividad en la plataforma.",
      response: "Tu panel de control es el centro de control de tu experiencia en Lúmina. Aquí encontrarás un resumen de tu progreso, cursos en los que estás inscrito y más."
    },
    {
      path: "/dashboard/profile",
      keywords: ["perfil", "mi perfil", "editar perfil", "datos personales"],
      title: "Mi Perfil",
      description: "Visualiza y edita tu perfil personal.",
      response: "En tu perfil puedes actualizar tu información personal, foto y preferencias. Mantener tu perfil actualizado nos ayuda a ofrecerte una mejor experiencia de aprendizaje."
    },
    {
      path: "/dashboard/progress",
      keywords: ["progreso", "mis cursos", "avance", "estadísticas de aprendizaje"],
      title: "Mi Progreso",
      description: "Sigue tu progreso en los cursos.",
      response: "En la sección de Mi Progreso podrás ver tu avance en cada curso, lecciones completadas y próximos pasos recomendados. ¡Es una excelente manera de mantenerte motivado!"
    },
    {
      path: "/dashboard/settings",
      keywords: ["configuración", "ajustes", "preferencias", "notificaciones", "privacidad"],
      title: "Configuración",
      description: "Ajusta tus preferencias de cuenta.",
      response: "En Configuración puedes personalizar cómo interactúas con Lúmina. Ajusta tus preferencias de notificaciones, privacidad y más según tus necesidades."
    },
    
    // Instructor
    {
      path: "/instructor",
      keywords: ["panel del instructor", "mis cursos como instructor", "gestión de cursos"],
      title: "Panel del Instructor",
      description: "Gestión de cursos como instructor.",
      response: "Como instructor, tu panel te permite gestionar tus cursos, ver el progreso de tus estudiantes y acceder a herramientas de enseñanza avanzadas."
    },
    {
      path: "/instructor/apply",
      keywords: ["ser instructor", "convertirse en instructor", "aplicar como instructor"],
      title: "Convertirse en Instructor",
      description: "Solicita convertirte en instructor.",
      response: "¡Nos encantaría que formes parte de nuestro equipo de instructores! Completa el formulario de solicitud y cuéntanos sobre tu experiencia y el tipo de cursos que te gustaría impartir."
    }, */
    
    // Ayuda y Soporte
    {
      path: "/help",
      keywords: ["ayuda", "soporte", "centro de ayuda", "preguntas frecuentes"],
      title: "Centro de Ayuda",
      description: "Encuentra ayuda y soporte.",
      response: "¿En qué necesitas ayuda? En nuestro Centro de Ayuda encontrarás guías, tutoriales y respuestas a las preguntas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos."
    },
    {
      path: "/help/faq",
      keywords: ["preguntas frecuentes", "dudas comunes", "faq"],
      title: "Preguntas Frecuentes",
      description: "Resuelve tus dudas más comunes.",
      response: "Hemos recopilado las preguntas más comunes que nos hacen nuestros usuarios. Es probable que encuentres respuestas rápidas a tus dudas en nuestra sección de Preguntas Frecuentes."
    },
    {
      path: "/help/contact",
      keywords: ["contacto", "soporte técnico", "escribirnos", "formulario de contacto"],
      title: "Contáctanos",
      description: "Formulario de contacto para soporte.",
      response: "¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. Puedes contactarnos a través del formulario de contacto y te responderemos lo antes posible."
    },
    
    // Términos y Privacidad
    {
      path: "/help/terms",
      keywords: ["términos y condiciones", "términos de uso", "condiciones de servicio"],
      title: "Términos y Condiciones",
      description: "Términos y condiciones de uso de la plataforma.",
      response: "Nuestros Términos y Condiciones detallan las reglas y pautas para usar nuestra plataforma. Te recomendamos revisarlos para conocer tus derechos y responsabilidades como usuario de Lúmina."
    },
    {
      path: "/help/policies",
      keywords: ["políticas de privacidad", "protección de datos", "privacidad"],
      title: "Políticas de Privacidad",
      description: "Políticas de privacidad de Lúmina.",
      response: "En Lúmina tomamos muy en serio la privacidad de tus datos. Nuestra Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información personal."
    }
  ];
  
  export const faqKnowledgeBase = [
    // Sobre la plataforma
    {
      keywords: ["qué es la plataforma", "plataforma de Lúmina", "qué ofrece", "funcionalidades"],
      answer: "Lúmina es una plataforma de aprendizaje en línea que ofrece cursos en diversas áreas de conocimiento. Nuestra plataforma te permite aprender a tu propio ritmo, con contenido de alta calidad y el apoyo de instructores expertos. Podrás acceder a lecciones en video, materiales descargables, ejercicios prácticos y recibir retroalimentación personalizada."
    },
    
    // Cuenta y Acceso
    {
      keywords: ["cómo registrarse", "crear cuenta", "registro", "darme de alta"],
      answer: "¡Registrarte en Lúmina es muy sencillo! Solo necesitas un correo electrónico válido y crear una contraseña segura. El proceso es rápido y en pocos minutos podrás comenzar a explorar nuestros cursos. ¿Te gustaría que te guíe paso a paso en el proceso de registro?"
    },
    {
      keywords: ["cómo iniciar sesión", "acceder a mi cuenta", "ingresar a la plataforma"],
      answer: "Para acceder a tu cuenta, ve a la sección de Iniciar Sesión e ingresa el correo electrónico y contraseña con los que te registraste. Si no recuerdas tu contraseña, puedes usar la opción '¿Olvidaste tu contraseña?' para restablecerla."
    },
    {
      keywords: ["recuperar contraseña", "olvidé mi contraseña", "resetear contraseña", "no puedo iniciar sesión"],
      answer: "Para recuperar tu contraseña, visita la página de [Recuperación de Contraseña](/password-reset)."
    }
  ];