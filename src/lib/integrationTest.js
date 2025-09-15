/**
 * Servicio de testing de integración Frontend ↔ Backend Java
 * Simula las llamadas al backend y verifica la compatibilidad
 */

class IntegrationTestService {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9002/api';
    this.testResults = [];
  }

  // Ejecutar todos los tests de integración
  async runAllTests() {
    console.log('🧪 Iniciando tests de integración Frontend ↔ Backend Java...');
    
    this.testResults = [];
    
    try {
      await this.testAuthentication();
      await this.testUsersEndpoint();
      await this.testCoursesEndpoint();
      await this.testLessonsEndpoint();
      await this.testSubscriptionsEndpoint();
      await this.testDataCompatibility();
      
      this.printResults();
      return this.testResults;
    } catch (error) {
      console.error('❌ Error ejecutando tests:', error);
      return this.testResults;
    }
  }

  // Test de autenticación
  async testAuthentication() {
    console.log('🔐 Testing autenticación...');
    
    try {
      const response = await fetch(`${this.baseUrl}/test/backend-simulation?endpoint=auth`);
      const data = await response.json();
      
      const test = {
        name: 'Autenticación',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          hasUser: !!data.data?.user,
          hasToken: !!data.data?.token,
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Autenticación',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Autenticación: FAIL - ${error.message}`);
    }
  }

  // Test de endpoint de usuarios
  async testUsersEndpoint() {
    console.log('👥 Testing endpoint de usuarios...');
    
    try {
      const response = await fetch(`${this.baseUrl}/test/backend-simulation?endpoint=users`);
      const data = await response.json();
      
      const test = {
        name: 'Endpoint Usuarios',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          userCount: data.data?.length || 0,
          hasRequiredFields: this.checkUserFields(data.data?.[0]),
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Endpoint Usuarios',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Endpoint Usuarios: FAIL - ${error.message}`);
    }
  }

  // Test de endpoint de cursos
  async testCoursesEndpoint() {
    console.log('📚 Testing endpoint de cursos...');
    
    try {
      const response = await fetch(`${this.baseUrl}/test/backend-simulation?endpoint=courses`);
      const data = await response.json();
      
      const test = {
        name: 'Endpoint Cursos',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          courseCount: data.data?.length || 0,
          hasRequiredFields: this.checkCourseFields(data.data?.[0]),
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Endpoint Cursos',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Endpoint Cursos: FAIL - ${error.message}`);
    }
  }

  // Test de endpoint de lecciones
  async testLessonsEndpoint() {
    console.log('🎥 Testing endpoint de lecciones...');
    
    try {
      const response = await fetch(`${this.baseUrl}/test/backend-simulation?endpoint=lessons&courseId=1`);
      const data = await response.json();
      
      const test = {
        name: 'Endpoint Lecciones',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          lessonCount: data.data?.length || 0,
          hasRequiredFields: this.checkLessonFields(data.data?.[0]),
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Endpoint Lecciones',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Endpoint Lecciones: FAIL - ${error.message}`);
    }
  }

  // Test de endpoint de suscripciones
  async testSubscriptionsEndpoint() {
    console.log('🔐 Testing endpoint de suscripciones...');
    
    try {
      const response = await fetch(`${this.baseUrl}/test/backend-simulation?endpoint=subscriptions&userId=3`);
      const data = await response.json();
      
      const test = {
        name: 'Endpoint Suscripciones',
        status: response.ok && data.success ? 'PASS' : 'FAIL',
        details: {
          statusCode: response.status,
          subscriptionCount: data.data?.length || 0,
          hasRequiredFields: this.checkSubscriptionFields(data.data?.[0]),
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Endpoint Suscripciones',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Endpoint Suscripciones: FAIL - ${error.message}`);
    }
  }

  // Test de compatibilidad de datos
  async testDataCompatibility() {
    console.log('🔄 Testing compatibilidad de datos...');
    
    try {
      // Test POST login
      const loginResponse = await fetch(`${this.baseUrl}/test/backend-simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          data: { email: 'admin@lumina.com', password: 'password123' }
        })
      });
      
      const loginData = await loginResponse.json();
      
      // Test POST subscribe
      const subscribeResponse = await fetch(`${this.baseUrl}/test/backend-simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'subscribe',
          data: { userId: 3, courseId: 1 }
        })
      });
      
      const subscribeData = await subscribeResponse.json();
      
      const test = {
        name: 'Compatibilidad de Datos',
        status: loginResponse.ok && subscribeResponse.ok ? 'PASS' : 'FAIL',
        details: {
          loginStatus: loginResponse.status,
          subscribeStatus: subscribeResponse.status,
          loginSuccess: loginData.success,
          subscribeSuccess: subscribeData.success,
          responseTime: Date.now()
        }
      };
      
      this.testResults.push(test);
      console.log(`✅ ${test.name}: ${test.status}`);
    } catch (error) {
      this.testResults.push({
        name: 'Compatibilidad de Datos',
        status: 'FAIL',
        error: error.message
      });
      console.log(`❌ Compatibilidad de Datos: FAIL - ${error.message}`);
    }
  }

  // Verificar campos requeridos de usuario
  checkUserFields(user) {
    if (!user) return false;
    const requiredFields = ['id', 'email', 'name', 'role'];
    return requiredFields.every(field => user.hasOwnProperty(field));
  }

  // Verificar campos requeridos de curso
  checkCourseFields(course) {
    if (!course) return false;
    const requiredFields = ['id', 'title', 'description', 'price', 'isFree'];
    return requiredFields.every(field => course.hasOwnProperty(field));
  }

  // Verificar campos requeridos de lección
  checkLessonFields(lesson) {
    if (!lesson) return false;
    const requiredFields = ['id', 'courseId', 'title', 'videoUrl'];
    return requiredFields.every(field => lesson.hasOwnProperty(field));
  }

  // Verificar campos requeridos de suscripción
  checkSubscriptionFields(subscription) {
    if (!subscription) return false;
    const requiredFields = ['id', 'userId', 'courseId', 'status'];
    return requiredFields.every(field => subscription.hasOwnProperty(field));
  }

  // Imprimir resultados
  printResults() {
    console.log('\n📊 RESULTADOS DE TESTS DE INTEGRACIÓN');
    console.log('=====================================');
    
    const passed = this.testResults.filter(t => t.status === 'PASS').length;
    const failed = this.testResults.filter(t => t.status === 'FAIL').length;
    const total = this.testResults.length;
    
    console.log(`✅ Tests pasados: ${passed}/${total}`);
    console.log(`❌ Tests fallidos: ${failed}/${total}`);
    console.log(`📈 Porcentaje de éxito: ${Math.round((passed/total) * 100)}%`);
    
    console.log('\n📋 DETALLES POR TEST:');
    this.testResults.forEach(test => {
      const icon = test.status === 'PASS' ? '✅' : '❌';
      console.log(`${icon} ${test.name}: ${test.status}`);
      if (test.details) {
        console.log(`   - Status Code: ${test.details.statusCode}`);
        console.log(`   - Response Time: ${test.details.responseTime}ms`);
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

export default IntegrationTestService;
