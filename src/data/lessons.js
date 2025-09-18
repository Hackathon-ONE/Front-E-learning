export const lessonsMock = [
  { id: 1, title: "Creando los primeros prompts", duration: "22min", videoUrl: "/video/video10.mp4", completed: true }, 
  { id: 2, title: "Mejorando la confiabilidad de los resultados", duration: "43min", videoUrl: "/video/video2.mp4",  completed: true }, 
  { id: 3, title: "Explorando aplicaciones", duration: "25min", videoUrl: "/video/video3.mp4", completed: false }, 
 /*  { id: 4, title: "Estrategias para textos largos", duration: "27min", videoUrl: "/video/vide4.mp4", completed: false },  */
]

// Lecciones específicas del curso de Vercel (ID: 103)
export const vercelLessons = [
  {
    id: 1,
    courseId: 103,
    title: "Introducción a Vercel",
    description: "Conoce qué es Vercel y por qué es la mejor opción para desplegar aplicaciones Next.js",
    duration: "15min",
    videoUrl: "/video/vercel.mp4",
    order: 1,
    completed: false,
    content: `
# Introducción a Vercel

Vercel es la plataforma líder para desplegar aplicaciones Next.js y React. En esta lección aprenderás:

- Qué es Vercel y sus ventajas
- Diferencias con otros servicios de hosting
- Casos de uso ideales
- Configuración inicial

## Ventajas de Vercel

- **Despliegue automático** con Git
- **Edge functions** para mejor rendimiento
- **CDN global** incluido
- **Analytics** integrado
- **Dominios personalizados** gratuitos
    `
  },
  {
    id: 2,
    courseId: 103,
    title: "Configuración del Proyecto",
    description: "Aprende a configurar tu proyecto Next.js para Vercel",
    duration: "20min",
    videoUrl: "/video/vercel.mp4",
    order: 2,
    completed: false,
    content: `
# Configuración del Proyecto

Configura tu proyecto Next.js para obtener el máximo rendimiento en Vercel:

## Archivos de Configuración

### vercel.json
\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
\`\`\`

### next.config.js
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['example.com']
  }
}

module.exports = nextConfig
\`\`\`
    `
  },
  {
    id: 3,
    courseId: 103,
    title: "Variables de Entorno",
    description: "Configura variables de entorno de forma segura en Vercel",
    duration: "18min",
    videoUrl: "/video/vercel.mp4",
    order: 3,
    completed: false,
    content: `
# Variables de Entorno en Vercel

Aprende a manejar variables de entorno de forma segura:

## Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las variables necesarias

## Tipos de Variables

- **Production**: Solo para producción
- **Preview**: Para branches de preview
- **Development**: Para desarrollo local

## Ejemplo de Uso

\`\`\`javascript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

// En tu código
const apiUrl = process.env.NEXT_PUBLIC_API_URL
\`\`\`
    `
  },
  {
    id: 4,
    courseId: 103,
    title: "Despliegue Automático",
    description: "Configura el despliegue automático con Git",
    duration: "25min",
    videoUrl: "/video/vercel.mp4",
    order: 4,
    completed: false,
    content: `
# Despliegue Automático con Git

Configura el despliegue automático para que cada push se despliegue automáticamente:

## Configuración de Git

1. Conecta tu repositorio de GitHub
2. Configura las ramas de despliegue
3. Establece comandos de build personalizados

## Ramas de Despliegue

- **Production**: Rama principal (main/master)
- **Preview**: Todas las demás ramas
- **Development**: Rama de desarrollo

## Comandos de Build

\`\`\`json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "outputDirectory": ".next"
}
\`\`\`
    `
  },
  {
    id: 5,
    courseId: 103,
    title: "Optimización de Rendimiento",
    description: "Optimiza tu aplicación para el mejor rendimiento en Vercel",
    duration: "22min",
    videoUrl: "/video/vercel.mp4",
    order: 5,
    completed: false,
    content: `
# Optimización de Rendimiento

Maximiza el rendimiento de tu aplicación en Vercel:

## Optimizaciones Automáticas

- **Image Optimization**: Optimización automática de imágenes
- **Code Splitting**: División automática del código
- **Tree Shaking**: Eliminación de código no utilizado
- **Minification**: Minificación automática

## Configuraciones Adicionales

### next.config.js
\`\`\`javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    formats: ['image/webp', 'image/avif']
  }
}
\`\`\`
    `
  },
  {
    id: 6,
    courseId: 103,
    title: "Funciones Serverless",
    description: "Crea y despliega funciones serverless con Vercel",
    duration: "30min",
    videoUrl: "/video/vercel.mp4",
    order: 6,
    completed: false,
    content: `
# Funciones Serverless en Vercel

Crea APIs y funciones serverless sin servidor:

## Estructura de Archivos

\`\`\`
pages/
  api/
    hello.js
    users/
      [id].js
\`\`\`

## Ejemplo de API Route

\`\`\`javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' })
}
\`\`\`

## Edge Functions

\`\`\`javascript
// api/edge-function.js
export const config = {
  runtime: 'edge',
}

export default function handler(req) {
  return new Response('Hello from Edge!')
}
\`\`\`
    `
  },
  {
    id: 7,
    courseId: 103,
    title: "Dominios Personalizados",
    description: "Configura dominios personalizados para tu aplicación",
    duration: "15min",
    videoUrl: "/video/vercel.mp4",
    order: 7,
    completed: false,
    content: `
# Dominios Personalizados

Configura tu propio dominio para tu aplicación:

## Configuración DNS

1. Agrega tu dominio en Vercel
2. Configura los registros DNS
3. Verifica la propiedad del dominio

## Tipos de Dominios

- **Apex Domain**: ejemplo.com
- **Subdomain**: www.ejemplo.com
- **Wildcard**: *.ejemplo.com

## Configuración SSL

- **Automático**: SSL automático con Let's Encrypt
- **Personalizado**: Usa tu propio certificado
    `
  },
  {
    id: 8,
    courseId: 103,
    title: "Monitoreo y Analytics",
    description: "Configura monitoreo y analytics para tu aplicación",
    duration: "20min",
    videoUrl: "/video/vercel.mp4",
    order: 8,
    completed: false,
    content: `
# Monitoreo y Analytics

Monitorea el rendimiento y uso de tu aplicación:

## Vercel Analytics

- **Web Vitals**: Core Web Vitals automáticos
- **Real User Monitoring**: Datos reales de usuarios
- **Performance Insights**: Análisis de rendimiento

## Configuración

\`\`\`javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
\`\`\`

## Métricas Importantes

- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift
    `
  }
]
  