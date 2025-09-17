#!/usr/bin/env node

/**
 * Script de prueba para verificar la integración Frontend ↔ Backend
 * Ejecuta pruebas de conectividad y funcionalidad
 */

const https = require('https');
const http = require('http');

const BACKEND_URL = 'https://back-e-learning-1.onrender.com';
const API_URL = `${BACKEND_URL}/api`;

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Función para hacer requests HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: options.timeout || 10000
    };

    const req = client.request(url, requestOptions, (res) => {
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
  console.log(`${colors.bold}${colors.blue}🧪 Iniciando Pruebas de Integración Frontend ↔ Backend${colors.reset}\n`);
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
      name: 'Probar Endpoint de Cursos (Sin Auth)',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/courses`);
          return {
            success: response.status === 403,
            details: {
              status: response.status,
              message: response.status === 403 ? 'Requiere autenticación (esperado)' : 'Respuesta inesperada'
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
            success: response.status === 200,
            details: {
              status: response.status,
              message: response.status === 200 ? 'Login exitoso' : 'Error en login',
              hasToken: response.data && response.data.token ? 'Sí' : 'No'
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
      name: 'Probar CORS',
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
          return {
            success: response.status === 200,
            details: {
              status: response.status,
              'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'] || 'No configurado',
              'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'] || 'No configurado',
              'Access-Control-Allow-Headers': response.headers['access-control-allow-headers'] || 'No configurado'
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
      name: 'Probar Estructura de Respuesta',
      test: async () => {
        try {
          const response = await makeRequest(`${API_URL}/auth/login`, {
            method: 'POST',
            body: {
              email: 'test@test.com',
              password: 'test123'
            }
          });
          
          const hasExpectedStructure = response.data && (
            response.data.hasOwnProperty('success') || 
            response.data.hasOwnProperty('message') || 
            response.data.hasOwnProperty('data')
          );
          
          return {
            success: hasExpectedStructure,
            details: {
              status: response.status,
              hasSuccess: response.data && response.data.hasOwnProperty('success'),
              hasMessage: response.data && response.data.hasOwnProperty('message'),
              hasData: response.data && response.data.hasOwnProperty('data'),
              responseKeys: response.data ? Object.keys(response.data) : 'No data'
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

  console.log(`${colors.bold}📊 Resumen de Pruebas${colors.reset}`);
  console.log(`${colors.green}✅ Exitosas: ${passed}/${total}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${total - passed}/${total}${colors.reset}`);
  console.log(`${colors.blue}📈 Porcentaje de éxito: ${percentage}%${colors.reset}\n`);

  if (percentage === 100) {
    console.log(`${colors.green}${colors.bold}🎉 ¡Excelente! El backend está funcionando perfectamente.${colors.reset}`);
  } else if (percentage >= 80) {
    console.log(`${colors.yellow}${colors.bold}⚠️ El backend está funcionando pero puede requerir configuración adicional.${colors.reset}`);
  } else {
    console.log(`${colors.red}${colors.bold}❌ Hay problemas significativos con el backend.${colors.reset}`);
  }

  console.log(`\n${colors.blue}💡 Próximos pasos:${colors.reset}`);
  console.log('1. Verificar que el backend esté ejecutándose correctamente');
  console.log('2. Revisar la configuración de CORS en el backend');
  console.log('3. Verificar que los endpoints estén implementados');
  console.log('4. Probar la integración desde el frontend');
}

// Ejecutar las pruebas
runTests().catch(console.error);
