#!/usr/bin/env node

/**
 * Script completo de prueba para verificar la integración con el backend
 * Prueba todos los endpoints y verifica la funcionalidad
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

// Pruebas
async function runTests() {
  console.log(`${colors.bold}${colors.cyan}🧪 PRUEBAS COMPLETAS DE INTEGRACIÓN BACKEND${colors.reset}\n`);
  console.log(`Backend URL: ${API_URL}\n`);

  const tests = [
    {
      name: 'Verificar Backend Disponible',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/health`);
          return {
            success: response.status === 200,
            details: {
              status: response.status,
              message: response.status === 200 ? 'Backend disponible' : 'Backend no disponible'
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
      name: 'Probar CORS (OPTIONS)',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`, {
            method: 'OPTIONS',
            headers: {
              'Origin': 'http://localhost:9002',
              'Access-Control-Request-Method': 'GET',
              'Access-Control-Request-Headers': 'Content-Type, Authorization'
            }
          });
          
          const corsHeaders = {
            'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
            'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
            'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
          };
          
          return {
            success: response.status === 200 && corsHeaders['Access-Control-Allow-Origin'] === 'http://localhost:9002',
            details: {
              status: response.status,
              corsOrigin: corsHeaders['Access-Control-Allow-Origin'],
              corsMethods: corsHeaders['Access-Control-Allow-Methods'],
              corsHeaders: corsHeaders['Access-Control-Allow-Headers']
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
      name: 'Probar Endpoint de Cursos (Sin Auth)',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`);
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Requiere autenticación (correcto)' : 'Respuesta inesperada',
              hasJson: response.data !== null
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
      name: 'Probar Endpoint de Cursos (Con Token)',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`, {
            headers: {
              'Authorization': 'Bearer test-token'
            }
          });
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Token inválido (esperado)' : 'Respuesta inesperada',
              error: response.data?.error || 'No hay error en JSON'
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
      name: 'Probar Endpoint de Autenticación',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/auth/login`, {
            method: 'POST',
            body: {
              email: 'admin@lumina.com',
              password: 'admin123'
            }
          });
          return {
            success: response.status === 200 || response.status === 403,
            details: {
              status: response.status,
              message: response.status === 200 ? 'Login exitoso' : 'Login fallido (puede ser normal)',
              hasJson: response.data !== null,
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
      name: 'Probar Endpoint de Usuarios',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/users`);
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Requiere autenticación (correcto)' : 'Respuesta inesperada'
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
      name: 'Probar Endpoint de Suscripciones',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/subscriptions`);
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Requiere autenticación (correcto)' : 'Respuesta inesperada'
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
      name: 'Verificar Estructura de Respuesta JSON',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`, {
            headers: {
              'Authorization': 'Bearer test-token'
            }
          });
          
          const hasJsonStructure = response.data && typeof response.data === 'object';
          const hasErrorField = response.data && response.data.hasOwnProperty('error');
          
          return {
            success: hasJsonStructure && hasErrorField,
            details: {
              status: response.status,
              hasJson: hasJsonStructure,
              hasError: hasErrorField,
              errorMessage: response.data?.error || 'No hay error',
              responseType: typeof response.data
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

  console.log(`${colors.bold}📊 RESUMEN DE PRUEBAS${colors.reset}`);
  console.log(`${colors.green}✅ Exitosas: ${passed}/${total}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${total - passed}/${total}${colors.reset}`);
  console.log(`${colors.blue}📈 Porcentaje de éxito: ${percentage}%${colors.reset}\n`);

  // Análisis específico
  console.log(`${colors.bold}🔍 ANÁLISIS DETALLADO${colors.reset}`);
  
  const corsTest = results.find(r => r.name === 'Probar CORS (OPTIONS)');
  if (corsTest && corsTest.success) {
    console.log(`${colors.green}✅ CORS configurado correctamente${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ CORS no configurado o mal configurado${colors.reset}`);
  }

  const authTest = results.find(r => r.name === 'Probar Endpoint de Autenticación');
  if (authTest) {
    if (authTest.details?.status === 200) {
      console.log(`${colors.green}✅ Autenticación funcionando${colors.reset}`);
    } else if (authTest.details?.status === 403) {
      console.log(`${colors.yellow}⚠️ Autenticación requiere configuración adicional${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Autenticación no funcional${colors.reset}`);
    }
  }

  const protectedEndpoints = results.filter(r => 
    r.name.includes('Cursos') || r.name.includes('Usuarios') || r.name.includes('Suscripciones')
  );
  const protectedWorking = protectedEndpoints.filter(r => r.success).length;
  
  if (protectedWorking === protectedEndpoints.length) {
    console.log(`${colors.green}✅ Endpoints protegidos funcionando correctamente${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ Algunos endpoints protegidos tienen problemas${colors.reset}`);
  }

  console.log(`\n${colors.cyan}💡 RECOMENDACIONES${colors.reset}`);
  
  if (percentage >= 80) {
    console.log(`${colors.green}🎉 El backend está funcionando bien. La integración debería funcionar.${colors.reset}`);
  } else if (percentage >= 60) {
    console.log(`${colors.yellow}⚠️ El backend está funcionando pero puede requerir configuración adicional.${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ El backend tiene problemas significativos que necesitan ser resueltos.${colors.reset}`);
  }

  console.log(`\n${colors.blue}🔗 Próximos pasos:${colors.reset}`);
  console.log('1. Probar la integración desde el frontend');
  console.log('2. Verificar que el sistema de fallback funcione');
  console.log('3. Configurar credenciales de autenticación válidas');
  console.log('4. Probar endpoints con tokens reales');
}

// Ejecutar las pruebas
runTests().catch(console.error);
