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

# 🚀 Flujo de trabajo con Git

## 1. Clona el repositorio

```bash
git clone <URL-del-repo>
cd <nombre-del-repo>
git switch develop
```

---

## 2. Crea tu rama desde develop

```bash
git switch develop
git pull origin develop   # trae lo último
git switch -c feature/nombre-de-tu-tarea
```

**Convención de nombres:**

- `feature/...` → nuevas funcionalidades
- `fix/...` → arreglos
- `chore/...` → tareas menores

Ejemplo:  
- `feature/login-page`
- `fix/navbar-bug`

---

## 3. Trabaja y guarda cambios

```bash
git add .
git commit -m "feat(login): formulario básico"
```

---

## 4. Sube tu rama al remoto

```bash
git push -u origin feature/nombre-de-tu-tarea
```

Luego en GitHub:

- Base: `develop`
- Compare: `feature/nombre...`
- Crea el Pull Request ✅

---

## 5. Ritual diario (cada mañana)

Antes de empezar a trabajar:

```bash
git switch develop
git pull origin develop     # actualiza develop

git switch feature/nombre
git merge develop           # trae lo último a tu rama
```

> Así todos trabajamos siempre con la base actualizada.

---

## 6. Después del merge

Limpieza de ramas que ya se integraron:

```bash
git branch -d feature/nombre
git push origin --delete feature/nombre
```

---

## 📌 Reglas básicas

- `main`: protegida, solo se actualiza en releases.
- `develop`: base de desarrollo, todas las ramas se integran acá con PR.
- Nada de pushes directos a `main` o `develop`. Siempre PR.

---

## 👉 Resumen de comandos clave

- `switch` para moverse entre ramas
- `merge` para traer cambios de develop
- `push` y PR para colaborar

<div align="center">
  <img src="https://github.com/user-attachments/assets/bc85ece2-16f8-4c27-ba00-6ad47dc7ed4c" alt="imagen"/>
</div>