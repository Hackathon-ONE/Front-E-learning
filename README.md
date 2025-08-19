# Front-E-learning

Plataforma de aprendizaje electrónico construida con Next.js 15 (App Router).

## Estructura de Carpetas

```
/src
 ├── app
 │    ├── layout.js                  # Layout global (Navbar + Footer)
 │    ├── page.js                    # Landing Page (Home)
 │    │
 │    ├── auth                       # Rutas de autenticación
 │    │    ├── login/page.js
 │    │    ├── register/page.js
 │    │    └── forgot-password/page.js
 │    │
 │    ├── dashboard                  # Panel Estudiante (protegido)
 │    │    ├── layout.js             # DashboardLayout (Navbar/Sidebar)
 │    │    ├── page.js               # Resumen del usuario
 │    │    ├── profile/page.js
 │    │    ├── settings/page.js
 │    │    └── progress/page.js
 │    │
 │    ├── courses                    # Catálogo de cursos (público/privado)
 │    │    ├── page.js               # Listado de cursos
 │    │    └── [id]
 │    │         ├── page.js          # Detalle curso
 │    │         ├── overview/page.js
 │    │         ├── lessons
 │    │         │    ├── page.js
 │    │         │    └── [lessonId]/page.js   # Course Player
 │    │         ├── quizzes
 │    │         │    └── [quizId]/page.js
 │    │         └── resources/page.js
 │    │
 │    ├── instructor                 # Panel del Instructor (role-based)
 │    │    ├── layout.js
 │    │    ├── courses/page.js        # Mis cursos creados
 │    │    ├── create/page.js
 │    │    ├── edit/[id]/page.js
 │    │    └── analytics/page.js
 │    │
 │    ├── admin                      # Panel del Admin (role-based)
 │    │    ├── layout.js
 │    │    ├── users/page.js
 │    │    ├── courses/page.js
 │    │    ├── payments/page.js
 │    │    └── settings/page.js
 │    │
 │    ├── payments
 │    │    ├── checkout/page.js
 │    │    └── history/page.js
 │    │
 │    ├── help
 │    │    ├── faq/page.js
 │    │    ├── contact/page.js
 │    │    └── terms/page.js
 │    │
 │    └── not-found.js               # Página 404
 │
 ├── components                      # UI compartida
 │    ├── ui/                        # Botones, inputs, modales, tablas
 │    ├── Navbar.jsx
 │    ├── Sidebar.jsx
 │    ├── Footer.jsx
 │    ├── Hero.jsx
 │    ├── AboutUs.jsx
 │    ├── Features.jsx
 │    ├── Partners.jsx
 │    ├── Pricing.jsx
 │    └── CTA.jsx
 │
 ├── context
 │    └── AuthContext.jsx            # Manejo de sesión (JWT, roles)
 │
 ├── lib
 │    ├── axios.js                   # Cliente API con interceptores
 │    ├── auth.js                    # Helpers de autenticación
 │    └── utils.js                   # Formatters, helpers
 │
 ├── hooks
 │    ├── useAuth.js
 │    ├── useCourse.js
 │    └── usePayment.js
 │
 └── styles
      └── globals.css                # Tailwind + estilos globales
```

## Instalación y uso rápido

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/front-e-learning.git
   cd front-e-learning
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Notas

- Utiliza Next.js 15 con App Router.
- Arquitectura modular y escalable.
- Roles: estudiante, instructor, administrador.
- Autenticación basada en JWT.
- UI construida con componentes reutilizables y Tailwind CSS.

---
