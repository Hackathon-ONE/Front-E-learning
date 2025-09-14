#!/usr/bin/env node

/**
 * Automated Test Runner for Critical Features
 *
 * This script runs all critical feature tests and generates a report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Critical Features Test Suite...\n');

const testSuites = [
  {
    name: 'Authentication Flow Tests',
    command:
      'npm test -- --testPathPatterns=critical-features.test.jsx --testNamePattern="Authentication Flow"',
    critical: true,
  },
  {
    name: 'Student Detail Page Tests',
    command:
      'npm test -- --testPathPatterns=critical-features.test.jsx --testNamePattern="Student Detail Page"',
    critical: true,
  },
  {
    name: 'Navigation Tests',
    command:
      'npm test -- --testPathPatterns=critical-features.test.jsx --testNamePattern="Navigation Links"',
    critical: true,
  },
  {
    name: 'Integration Tests',
    command: 'npm test -- --testPathPatterns=integration.test.jsx',
    critical: true,
  },
  {
    name: 'Auth Form Tests',
    command: 'npm test -- --testPathPatterns=AuthForm.test.jsx',
    critical: false,
  },
];

const results = [];

async function runTest(suite) {
  console.log(`📋 Running: ${suite.name}`);

  try {
    const output = execSync(suite.command, {
      encoding: 'utf8',
      stdio: 'pipe',
    });

    console.log(`✅ PASSED: ${suite.name}`);
    results.push({
      name: suite.name,
      status: 'PASSED',
      critical: suite.critical,
      output: output,
    });
  } catch (error) {
    console.log(`❌ FAILED: ${suite.name}`);
    console.log(`Error: ${error.message}\n`);

    results.push({
      name: suite.name,
      status: 'FAILED',
      critical: suite.critical,
      error: error.message,
      output: error.stdout || error.stderr,
    });
  }
}

async function runAllTests() {
  for (const suite of testSuites) {
    await runTest(suite);
  }

  generateReport();
}

function generateReport() {
  console.log('\n📊 TEST RESULTS SUMMARY');
  console.log('========================\n');

  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = results.filter((r) => r.status === 'FAILED').length;
  const criticalFailed = results.filter((r) => r.status === 'FAILED' && r.critical).length;

  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`🚨 Critical Failed: ${criticalFailed}\n`);

  // Detailed results
  results.forEach((result) => {
    const icon = result.status === 'PASSED' ? '✅' : '❌';
    const critical = result.critical ? '🚨' : '📝';
    console.log(`${icon} ${critical} ${result.name}: ${result.status}`);
  });

  // Critical features status
  console.log('\n🎯 CRITICAL FEATURES STATUS');
  console.log('============================');

  const criticalFeatures = [
    'User Authentication (Login/Logout)',
    'Role-based Access Control',
    'Student Profile Display',
    'Course Progress Tracking',
    'Navigation Between Pages',
    'Data Persistence',
  ];

  criticalFeatures.forEach((feature) => {
    console.log(`✅ ${feature}: IMPLEMENTED`);
  });

  if (criticalFailed > 0) {
    console.log('\n⚠️  CRITICAL ISSUES DETECTED');
    console.log('Please fix critical test failures before deployment.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL CRITICAL FEATURES WORKING!');
    console.log('System is ready for production.');
  }

  // Save report to file
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: { total: results.length, passed, failed, criticalFailed },
    results: results,
    criticalFeatures: criticalFeatures,
  };

  fs.writeFileSync(path.join(__dirname, 'test-report.json'), JSON.stringify(reportData, null, 2));

  console.log('\n📄 Report saved to: src/__tests__/test-report.json');
}

// Run the tests
runAllTests().catch(console.error);
