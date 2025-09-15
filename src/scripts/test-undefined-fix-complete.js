/**
 * Script completo para verificar que se ha solucionado el problema de undefined
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:9002/api';

async function testUndefinedFixComplete() {
  console.log('🧪 Verificando solución completa del problema de undefined...\n');
  
  const tests = [
    {
      name: 'Test 1: Endpoint de suscripciones con ID válido (1)',
      url: `${BASE_URL}/subscriptions/1`,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Test 2: Endpoint de suscripciones con ID válido (2)',
      url: `${BASE_URL}/subscriptions/2`,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Test 3: Endpoint de suscripciones con ID inválido (999)',
      url: `${BASE_URL}/subscriptions/999`,
      method: 'GET',
      expectedStatus: 404
    },
    {
      name: 'Test 4: Endpoint de suscripciones con ID undefined (debería fallar)',
      url: `${BASE_URL}/subscriptions/undefined`,
      method: 'GET',
      expectedStatus: 400
    },
    {
      name: 'Test 5: Endpoint de cursos con ID válido',
      url: `${BASE_URL}/courses/1`,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Test 6: Endpoint de cursos con ID undefined (debería fallar)',
      url: `${BASE_URL}/courses/undefined`,
      method: 'GET',
      expectedStatus: 404
    }
  ];

  const results = [];

  for (const test of tests) {
    try {
      console.log(`🔍 ${test.name}...`);
      
      const response = await fetch(test.url, { 
        method: test.method,
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      const passed = response.status === test.expectedStatus;
      results.push({
        name: test.name,
        status: passed ? 'PASS' : 'FAIL',
        details: {
          expectedStatus: test.expectedStatus,
          actualStatus: response.status,
          hasData: !!data,
          success: data?.success,
          error: data?.error
        }
      });
      
      const statusIcon = passed ? '✅' : '❌';
      console.log(`   ${statusIcon} Status: ${response.status} (esperado: ${test.expectedStatus})`);
      
      if (data?.error) {
        console.log(`   📝 Error: ${data.error}`);
      }
      
    } catch (error) {
      results.push({
        name: test.name,
        status: 'FAIL',
        error: error.message
      });
      console.log(`   ❌ Error de conexión: ${error.message}`);
    }
  }

  console.log('\n📊 RESULTADOS COMPLETOS:');
  console.log('========================');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const total = results.length;
  
  console.log(`✅ Tests pasados: ${passed}/${total}`);
  console.log(`❌ Tests fallidos: ${failed}/${total}`);
  console.log(`📈 Porcentaje de éxito: ${Math.round((passed/total) * 100)}%`);
  
  console.log('\n📋 DETALLES POR TEST:');
  results.forEach(test => {
    const icon = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${test.name}`);
    console.log(`   - Status: ${test.details?.actualStatus || 'N/A'} (esperado: ${test.details?.expectedStatus || 'N/A'})`);
    if (test.details?.error) {
      console.log(`   - Error: ${test.details.error}`);
    }
    if (test.error) {
      console.log(`   - Error de conexión: ${test.error}`);
    }
  });
  
  if (failed === 0) {
    console.log('\n🎉 ¡PROBLEMA COMPLETAMENTE SOLUCIONADO!');
    console.log('   - No se detectan llamadas con undefined');
    console.log('   - Todos los endpoints manejan IDs inválidos correctamente');
    console.log('   - El frontend está listo para el backend Java');
  } else {
    console.log('\n⚠️  Aún hay problemas que resolver:');
    results.filter(r => r.status === 'FAIL').forEach(test => {
      console.log(`   - ${test.name}: ${test.details?.error || test.error}`);
    });
  }
  
  return results;
}

// Ejecutar test si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testUndefinedFixComplete();
}

export default testUndefinedFixComplete;
