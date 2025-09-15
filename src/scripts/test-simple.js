/**
 * Test simple para verificar endpoints
 */

const BASE_URL = 'http://localhost:9002/api';

async function testEndpoints() {
  console.log('🧪 Verificando endpoints...\n');
  
  const tests = [
    {
      name: 'Test 1: Suscripciones con ID válido (1)',
      url: `${BASE_URL}/subscriptions/1`,
      expectedStatus: 200
    },
    {
      name: 'Test 2: Suscripciones con ID válido (2)', 
      url: `${BASE_URL}/subscriptions/2`,
      expectedStatus: 200
    },
    {
      name: 'Test 3: Suscripciones con ID inválido (999)',
      url: `${BASE_URL}/subscriptions/999`,
      expectedStatus: 404
    },
    {
      name: 'Test 4: Suscripciones con ID undefined',
      url: `${BASE_URL}/subscriptions/undefined`,
      expectedStatus: 400
    },
    {
      name: 'Test 5: Cursos con ID válido',
      url: `${BASE_URL}/courses/1`,
      expectedStatus: 200
    }
  ];

  for (const test of tests) {
    try {
      console.log(`🔍 ${test.name}...`);
      
      const response = await fetch(test.url);
      const data = await response.json();
      
      const passed = response.status === test.expectedStatus;
      const icon = passed ? '✅' : '❌';
      
      console.log(`   ${icon} Status: ${response.status} (esperado: ${test.expectedStatus})`);
      
      if (data?.error) {
        console.log(`   📝 Error: ${data.error}`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error de conexión: ${error.message}`);
    }
  }
  
  console.log('\n🎯 Test completado');
}

testEndpoints();
