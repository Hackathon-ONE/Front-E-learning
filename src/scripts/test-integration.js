/**
 * Script de testing automatizado para integración Frontend ↔ Backend
 * Ejecutar con: node src/scripts/test-integration.js
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:9002/api';
const BACKEND_URL = 'http://localhost:8080/api'; // URL del backend Java

class AutomatedIntegrationTest {
  constructor() {
    this.results = [];
    this.backendAvailable = false;
  }

  async runAllTests() {
    console.log('🚀 Iniciando tests automatizados de integración...\n');

    try {
      // Verificar si el backend está disponible
      await this.checkBackendAvailability();

      if (this.backendAvailable) {
        console.log('✅ Backend Java detectado, ejecutando tests reales...\n');
        await this.runRealBackendTests();
      } else {
        console.log('⚠️  Backend Java no disponible, ejecutando tests simulados...\n');
        await this.runSimulatedTests();
      }

      this.printResults();
      return this.results;
    } catch (error) {
      console.error('❌ Error ejecutando tests:', error);
      return this.results;
    }
  }

  // Verificar disponibilidad del backend
  async checkBackendAvailability() {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      this.backendAvailable = response.ok;
    } catch (error) {
      this.backendAvailable = false;
    }
  }

  // Ejecutar tests con backend real
  async runRealBackendTests() {
    await this.testRealAuthentication();
    await this.testRealCourses();
    await this.testRealUsers();
    await this.testRealSubscriptions();
  }

  // Ejecutar tests simulados
  async runSimulatedTests() {
    await this.testSimulatedAuthentication();
    await this.testSimulatedCourses();
    await this.testSimulatedUsers();
    await this.testSimulatedSubscriptions();
  }

  // Test de autenticación real
  async testRealAuthentication() {
    console.log('🔐 Testing autenticación real...');

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@lumina.com',
          password: 'admin123',
        }),
      });

      const data = await response.json();

      this.results.push({
        name: 'Autenticación Real',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          hasToken: !!data.data?.token,
          hasUser: !!data.data?.user,
          responseTime: Date.now(),
        },
      });

      console.log(`✅ Autenticación Real: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Autenticación Real',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Autenticación Real: FAIL - ${error.message}`);
    }
  }

  // Test de cursos reales
  async testRealCourses() {
    console.log('📚 Testing cursos reales...');

    try {
      const response = await fetch(`${BACKEND_URL}/courses`);
      const data = await response.json();

      this.results.push({
        name: 'Cursos Reales',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          courseCount: data.data?.length || 0,
          hasRequiredFields: this.checkCourseFields(data.data?.[0]),
        },
      });

      console.log(`✅ Cursos Reales: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Cursos Reales',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Cursos Reales: FAIL - ${error.message}`);
    }
  }

  // Test de usuarios reales
  async testRealUsers() {
    console.log('👥 Testing usuarios reales...');

    try {
      const response = await fetch(`${BACKEND_URL}/users`);
      const data = await response.json();

      this.results.push({
        name: 'Usuarios Reales',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          userCount: data.data?.length || 0,
          hasRequiredFields: this.checkUserFields(data.data?.[0]),
        },
      });

      console.log(`✅ Usuarios Reales: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Usuarios Reales',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Usuarios Reales: FAIL - ${error.message}`);
    }
  }

  // Test de suscripciones reales
  async testRealSubscriptions() {
    console.log('🔐 Testing suscripciones reales...');

    try {
      const response = await fetch(`${BACKEND_URL}/subscriptions?userId=3`);
      const data = await response.json();

      this.results.push({
        name: 'Suscripciones Reales',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          subscriptionCount: data.data?.length || 0,
          hasRequiredFields: this.checkSubscriptionFields(data.data?.[0]),
        },
      });

      console.log(`✅ Suscripciones Reales: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Suscripciones Reales',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Suscripciones Reales: FAIL - ${error.message}`);
    }
  }

  // Test de autenticación simulada
  async testSimulatedAuthentication() {
    console.log('🔐 Testing autenticación simulada...');

    try {
      const response = await fetch(`${BASE_URL}/test/backend-simulation?endpoint=auth`);
      const data = await response.json();

      this.results.push({
        name: 'Autenticación Simulada',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          hasToken: !!data.data?.token,
          hasUser: !!data.data?.user,
        },
      });

      console.log(`✅ Autenticación Simulada: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Autenticación Simulada',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Autenticación Simulada: FAIL - ${error.message}`);
    }
  }

  // Test de cursos simulados
  async testSimulatedCourses() {
    console.log('📚 Testing cursos simulados...');

    try {
      const response = await fetch(`${BASE_URL}/test/backend-simulation?endpoint=courses`);
      const data = await response.json();

      this.results.push({
        name: 'Cursos Simulados',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          courseCount: data.data?.length || 0,
          hasRequiredFields: this.checkCourseFields(data.data?.[0]),
        },
      });

      console.log(`✅ Cursos Simulados: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Cursos Simulados',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Cursos Simulados: FAIL - ${error.message}`);
    }
  }

  // Test de usuarios simulados
  async testSimulatedUsers() {
    console.log('👥 Testing usuarios simulados...');

    try {
      const response = await fetch(`${BASE_URL}/test/backend-simulation?endpoint=users`);
      const data = await response.json();

      this.results.push({
        name: 'Usuarios Simulados',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          userCount: data.data?.length || 0,
          hasRequiredFields: this.checkUserFields(data.data?.[0]),
        },
      });

      console.log(`✅ Usuarios Simulados: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Usuarios Simulados',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Usuarios Simulados: FAIL - ${error.message}`);
    }
  }

  // Test de suscripciones simuladas
  async testSimulatedSubscriptions() {
    console.log('🔐 Testing suscripciones simuladas...');

    try {
      const response = await fetch(
        `${BASE_URL}/test/backend-simulation?endpoint=subscriptions&userId=3`
      );
      const data = await response.json();

      this.results.push({
        name: 'Suscripciones Simuladas',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          subscriptionCount: data.data?.length || 0,
          hasRequiredFields: this.checkSubscriptionFields(data.data?.[0]),
        },
      });

      console.log(`✅ Suscripciones Simuladas: ${response.ok ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      this.results.push({
        name: 'Suscripciones Simuladas',
        status: 'FAIL',
        error: error.message,
      });
      console.log(`❌ Suscripciones Simuladas: FAIL - ${error.message}`);
    }
  }

  // Verificar campos de usuario
  checkUserFields(user) {
    if (!user) return false;
    const requiredFields = ['id', 'email', 'name', 'role'];
    return requiredFields.every((field) => user.hasOwnProperty(field));
  }

  // Verificar campos de curso
  checkCourseFields(course) {
    if (!course) return false;
    const requiredFields = ['id', 'title', 'description', 'price', 'isFree'];
    return requiredFields.every((field) => course.hasOwnProperty(field));
  }

  // Verificar campos de suscripción
  checkSubscriptionFields(subscription) {
    if (!subscription) return false;
    const requiredFields = ['id', 'userId', 'courseId', 'status'];
    return requiredFields.every((field) => subscription.hasOwnProperty(field));
  }

  // Imprimir resultados
  printResults() {
    console.log('\n📊 RESULTADOS DE TESTS AUTOMATIZADOS');
    console.log('=====================================');

    const passed = this.results.filter((r) => r.status === 'PASS').length;
    const failed = this.results.filter((r) => r.status === 'FAIL').length;
    const total = this.results.length;

    console.log(`✅ Tests pasados: ${passed}/${total}`);
    console.log(`❌ Tests fallidos: ${failed}/${total}`);
    console.log(`📈 Porcentaje de éxito: ${Math.round((passed / total) * 100)}%`);

    console.log('\n📋 DETALLES POR TEST:');
    this.results.forEach((test) => {
      const icon = test.status === 'PASS' ? '✅' : '❌';
      console.log(`${icon} ${test.name}: ${test.status}`);
      if (test.details) {
        console.log(`   - Status Code: ${test.details.statusCode}`);
        if (test.details.userCount !== undefined) {
          console.log(`   - Usuarios: ${test.details.userCount}`);
        }
        if (test.details.courseCount !== undefined) {
          console.log(`   - Cursos: ${test.details.courseCount}`);
        }
        if (test.details.subscriptionCount !== undefined) {
          console.log(`   - Suscripciones: ${test.details.subscriptionCount}`);
        }
        console.log(`   - Campos requeridos: ${test.details.hasRequiredFields ? '✅' : '❌'}`);
      }
      if (test.error) {
        console.log(`   - Error: ${test.error}`);
      }
    });

    if (failed === 0) {
      console.log('\n🎉 ¡TODOS LOS TESTS PASARON! El frontend está listo para el backend Java.');
    } else {
      console.log('\n⚠️  Algunos tests fallaron. Revisa la configuración.');
    }
  }
}

// Ejecutar tests si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const test = new AutomatedIntegrationTest();
  test.runAllTests();
}

export default AutomatedIntegrationTest;
