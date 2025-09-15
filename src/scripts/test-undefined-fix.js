/**
 * Script para verificar que se ha solucionado el problema de courseId undefined
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:9002/api';

async function testUndefinedFix() {
  console.log('🧪 Verificando que se ha solucionado el problema de courseId undefined...\n');
  
  const tests = [
    {
      name: 'Test endpoint de suscripciones con ID válido',
      url: `${BASE_URL}/subscriptions/1`,
      expectedStatus: 200
    },
    {
      name: 'Test endpoint de suscripciones con ID inválido',
      url: `${BASE_URL}/subscriptions/999`,
      expectedStatus: 404
    },
    {
      name: 'Test endpoint de cursos con ID válido',
      url: `${BASE_URL}/courses/1`,
      expectedStatus: 200
    },
    {
      name: 'Test endpoint de cursos con ID inválido',
      url: `${BASE_URL}/courses/999`,
      expectedStatus: 404
    }
  ];

  const results = [];

  for (const test of tests) {
    try {
      console.log(`🔍 ${test.name}...`);
      
      const response = await fetch(test.url);
      const data = await response.json();
      
      const passed = response.status === test.expectedStatus;
      results.push({
        name: test.name,
        status: passed ? 'PASS' : 'FAIL',
        details: {
          expectedStatus: test.expectedStatus,
          actualStatus: response.status,
          hasData: !!data,
          success: data?.success
        }
      });
      
      console.log(`   ${passed ? '✅' : '❌'} Status: ${response.status} (esperado: ${test.expectedStatus})`);
      
    } catch (error) {
      results.push({
        name: test.name,
        status: 'FAIL',
        error: error.message
      });
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n📊 RESULTADOS:');
  console.log('==============');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  console.log(`✅ Tests pasados: ${passed}/${results.length}`);
  console.log(`❌ Tests fallidos: ${failed}/${results.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 ¡Problema de courseId undefined solucionado!');
  } else {
    console.log('\n⚠️  Aún hay problemas que resolver.');
  }
  
  return results;
}

// Ejecutar test si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testUndefinedFix();
}

export default testUndefinedFix;
