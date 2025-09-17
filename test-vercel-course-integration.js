#!/usr/bin/env node

/**
 * Script para probar la integración del curso de Vercel con el backend
 * Envía el curso completo al backend y verifica la respuesta
 */

const https = require('https');

const BACKEND_URL = 'https://back-e-learning-1.onrender.com';
const API_URL = `${BACKEND_URL}/api`;

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Datos del curso de Vercel
const vercelCourse = {
  id: 103,
  title: 'Despliegue con Vercel',
  description: 'Aprende a desplegar aplicaciones Next.js de forma profesional con Vercel.',
  cover: '/courses/vercel.jpg',
  category: 'DevOps',
  level: 'Intermedio',
  price: 49.99,
  isFree: false,
  instructorId: 3,
  instructorName: 'Carlos Rodríguez',
  duration: '8h 45m',
  studentsCount: 320,
  lessons: 18,
  objectives: [
    'Configuración de proyectos en Vercel',
    'Despliegue automático con Git',
    'Variables de entorno y configuración',
    'Optimización de rendimiento',
    'Monitoreo y analytics',
    'Dominios personalizados',
    'Funciones serverless',
    'Edge functions y CDN',
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Datos del instructor
const vercelInstructor = {
  id: 3,
  name: 'Carlos Rodríguez',
  email: 'carlos.rodriguez@lumina.com',
  bio: 'DevOps Engineer con más de 5 años de experiencia en despliegue de aplicaciones web. Especialista en Vercel, AWS y CI/CD.',
  avatar: '/avatars/carlos-rodriguez.jpg',
  experience: 'DevOps Engineer, especialista en Vercel y despliegue de aplicaciones',
  social: {
    linkedin: 'https://linkedin.com/in/carlos-rodriguez-devops',
    github: 'https://github.com/carlos-rodriguez',
    twitter: 'https://twitter.com/carlos_devops',
  },
  status: 'approved',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Lecciones del curso de Vercel
const vercelLessons = [
  {
    id: 1,
    courseId: 103,
    title: 'Introducción a Vercel',
    description: 'Conoce qué es Vercel y por qué es la mejor opción para desplegar aplicaciones Next.js',
    duration: '15min',
    videoUrl: '/video/vercel.mp4',
    order: 1,
    completed: false,
    content: '# Introducción a Vercel\n\nVercel es la plataforma líder para desplegar aplicaciones Next.js y React.'
  },
  {
    id: 2,
    courseId: 103,
    title: 'Configuración del Proyecto',
    description: 'Aprende a configurar tu proyecto Next.js para Vercel',
    duration: '20min',
    videoUrl: '/video/vercel.mp4',
    order: 2,
    completed: false,
    content: '# Configuración del Proyecto\n\nConfigura tu proyecto Next.js para obtener el máximo rendimiento en Vercel.'
  },
  {
    id: 3,
    courseId: 103,
    title: 'Variables de Entorno',
    description: 'Configura variables de entorno de forma segura en Vercel',
    duration: '18min',
    videoUrl: '/video/vercel.mp4',
    order: 3,
    completed: false,
    content: '# Variables de Entorno en Vercel\n\nAprende a manejar variables de entorno de forma segura.'
  },
  {
    id: 4,
    courseId: 103,
    title: 'Despliegue Automático',
    description: 'Configura el despliegue automático con Git',
    duration: '25min',
    videoUrl: '/video/vercel.mp4',
    order: 4,
    completed: false,
    content: '# Despliegue Automático con Git\n\nConfigura el despliegue automático para que cada push se despliegue automáticamente.'
  },
  {
    id: 5,
    courseId: 103,
    title: 'Optimización de Rendimiento',
    description: 'Optimiza tu aplicación para el mejor rendimiento en Vercel',
    duration: '22min',
    videoUrl: '/video/vercel.mp4',
    order: 5,
    completed: false,
    content: '# Optimización de Rendimiento\n\nMaximiza el rendimiento de tu aplicación en Vercel.'
  }
];

// Función para hacer requests HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: options.timeout || 10000
    };

    const req = https.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: data,
            parseError: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Función para imprimir resultados
function printResult(testName, result) {
  const icon = result.success ? '✅' : '❌';
  const color = result.success ? colors.green : colors.red;
  
  console.log(`${color}${icon} ${testName}${colors.reset}`);
  
  if (result.details) {
    Object.entries(result.details).forEach(([key, value]) => {
      console.log(`   ${colors.blue}${key}:${colors.reset} ${value}`);
    });
  }
  
  if (result.error) {
    console.log(`   ${colors.red}Error:${colors.reset} ${result.error}`);
  }
  
  console.log('');
}

// Pruebas de integración
async function runTests() {
  console.log(`${colors.bold}${colors.cyan}🚀 PRUEBAS DE INTEGRACIÓN CURSO VERCEL${colors.reset}\n`);
  console.log(`Backend URL: ${API_URL}\n`);

  const tests = [
    {
      name: 'Verificar Conectividad del Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`);
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Backend responde correctamente' : 'Respuesta inesperada'
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    },
    {
      name: 'Enviar Curso de Vercel al Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`, {
            method: 'POST',
            body: vercelCourse
          });
          return {
            success: response.status === 201 || response.status === 200,
            details: {
              status: response.status,
              message: response.status === 201 ? 'Curso creado exitosamente' : 'Respuesta inesperada',
              courseId: response.data?.id || 'No disponible',
              responseData: response.data
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    },
    {
      name: 'Enviar Instructor al Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/instructors`, {
            method: 'POST',
            body: vercelInstructor
          });
          return {
            success: response.status === 201 || response.status === 200,
            details: {
              status: response.status,
              message: response.status === 201 ? 'Instructor creado exitosamente' : 'Respuesta inesperada',
              instructorId: response.data?.id || 'No disponible',
              responseData: response.data
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    },
    {
      name: 'Enviar Lecciones al Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses/103/lessons`, {
            method: 'POST',
            body: vercelLessons
          });
          return {
            success: response.status === 201 || response.status === 200,
            details: {
              status: response.status,
              message: response.status === 201 ? 'Lecciones creadas exitosamente' : 'Respuesta inesperada',
              lessonsCount: vercelLessons.length,
              responseData: response.data
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    },
    {
      name: 'Verificar Curso en el Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses/103`);
          return {
            success: response.status === 200,
            details: {
              status: response.status,
              message: response.status === 200 ? 'Curso encontrado en el backend' : 'Curso no encontrado',
              courseTitle: response.data?.title || 'No disponible',
              responseData: response.data
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    },
    {
      name: 'Verificar Lecciones en el Backend',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses/103/lessons`);
          return {
            success: response.status === 200,
            details: {
              status: response.status,
              message: response.status === 200 ? 'Lecciones encontradas en el backend' : 'Lecciones no encontradas',
              lessonsCount: response.data?.length || 0,
              responseData: response.data
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      }
    }
  ];

  const results = [];
  
  for (const test of tests) {
    try {
      const result = await test.test();
      results.push({ name: test.name, ...result });
      printResult(test.name, result);
    } catch (error) {
      const result = {
        name: test.name,
        success: false,
        error: error.message
      };
      results.push(result);
      printResult(test.name, result);
    }
  }

  // Resumen
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);

  console.log(`${colors.bold}📊 RESUMEN DE INTEGRACIÓN${colors.reset}`);
  console.log(`${colors.green}✅ Exitosas: ${passed}/${total}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${total - passed}/${total}${colors.reset}`);
  console.log(`${colors.blue}📈 Porcentaje de éxito: ${percentage}%${colors.reset}\n`);

  // Análisis específico
  console.log(`${colors.bold}🔍 ANÁLISIS DEL CURSO VERCEL${colors.reset}`);
  
  const courseTest = results.find(r => r.name === 'Enviar Curso de Vercel al Backend');
  if (courseTest && courseTest.success) {
    console.log(`${colors.green}✅ Curso de Vercel enviado exitosamente al backend${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ Curso de Vercel no se pudo enviar (puede requerir autenticación)${colors.reset}`);
  }

  const instructorTest = results.find(r => r.name === 'Enviar Instructor al Backend');
  if (instructorTest && instructorTest.success) {
    console.log(`${colors.green}✅ Instructor Carlos Rodríguez enviado exitosamente${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ Instructor no se pudo enviar (puede requerir autenticación)${colors.reset}`);
  }

  const lessonsTest = results.find(r => r.name === 'Enviar Lecciones al Backend');
  if (lessonsTest && lessonsTest.success) {
    console.log(`${colors.green}✅ Lecciones enviadas exitosamente (${vercelLessons.length} lecciones)${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ Lecciones no se pudieron enviar (puede requerir autenticación)${colors.reset}`);
  }

  console.log(`\n${colors.cyan}💡 INFORMACIÓN DEL CURSO VERCEL${colors.reset}`);
  console.log(`📚 Título: ${vercelCourse.title}`);
  console.log(`👨‍🏫 Instructor: ${vercelCourse.instructorName}`);
  console.log(`💰 Precio: $${vercelCourse.price}`);
  console.log(`⏱️ Duración: ${vercelCourse.duration}`);
  console.log(`📖 Lecciones: ${vercelCourse.lessons}`);
  console.log(`🎯 Objetivos: ${vercelCourse.objectives.length}`);
  console.log(`🖼️ Imagen: ${vercelCourse.cover}`);
  console.log(`🎥 Video: /video/vercel.mp4`);

  console.log(`\n${colors.blue}🔗 Próximos pasos:${colors.reset}`);
  console.log('1. Verificar que el curso aparezca en el frontend');
  console.log('2. Probar la navegación a las lecciones');
  console.log('3. Verificar que el video se reproduzca correctamente');
  console.log('4. Probar la funcionalidad de suscripción');
}

// Ejecutar las pruebas
runTests().catch(console.error);
