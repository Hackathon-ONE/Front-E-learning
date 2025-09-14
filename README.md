# Front-Lumina

Plataforma de aprendizaje electrónico construida con Next.js 15 (App Router).

## Estructura de Carpetas

```
/src
 ├── ai/                            # Inteligencia Artificial y flujos
 ├── app/                           # Rutas de la aplicación (Next.js App Router)
 │    ├── about/                    # Páginas sobre la plataforma
 │    ├── admin/                    # Panel de administración
 │    ├── api/                      # Endpoints de API
 │    ├── auth/                     # Autenticación
 │    ├── chatbot/                  # Chatbot de asistencia
 │    ├── courses/                  # Cursos
 │    ├── dashboard/                # Panel de control
 │    ├── demo/                     # Demostraciones
 │    ├── help/                     # Ayuda y soporte
 │    ├── instructor/               # Panel de instructores
 │    ├── payments/                 # Gestión de pagos
 │    ├── students/                 # Área de estudiantes
 │    └── team/                     # Equipo
 │
 ├── assets/                        # Recursos estáticos
 ├── components/                    # Componentes reutilizables
 │    ├── __tests__/               # Pruebas de componentes
 │    └── ui/                       # Componentes de interfaz de usuario
 │
 ├── constants/                     # Constantes de la aplicación
 ├── context/                       # Contextos de React
 ├── data/                          # Datos y configuraciones
 ├── hooks/                         # Custom React Hooks
 │    ├── useAuth.js                # Manejo de autenticación
 │    └── useCourse.js              # Lógica de cursos
 │
 ├── lib/                           # Utilidades y bibliotecas
 │    ├── api/                      # Llamadas a la API
 │    ├── auth/                     # Helpers de autenticación
 │    └── utils/                    # Funciones de utilidad
 │
 ├── pages/                         # Páginas (legacy, usar app/)
 ├── services/                      # Servicios y APIs
 ├── shared/                        # Código compartido
 └── types/                         # Definiciones de TypeScript

/public                           # Archivos estáticos
 ├── avatars/                      # Imágenes de perfil
 ├── courses/                      # Imágenes de cursos
 ├── images/                       # Imágenes generales
 ├── logos/                        # Logotipos
 └── videos/                       # Videos de lecciones

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