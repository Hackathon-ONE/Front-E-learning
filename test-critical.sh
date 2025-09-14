#!/bin/bash

# 🧪 Critical Features Quick Test Script
# Run this to quickly test all critical functionality

echo "🚀 Starting Critical Features Test..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -e "${BLUE}📋 Testing: $test_name${NC}"
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSED: $test_name${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAILED: $test_name${NC}"
        ((TESTS_FAILED++))
    fi
}

# 1. Check if dependencies are installed
echo -e "${YELLOW}🔍 Checking dependencies...${NC}"
run_test "Node modules installed" "test -d node_modules"
run_test "Next.js available" "npx next --version"

# 2. Check critical files exist
echo -e "${YELLOW}📁 Checking critical files...${NC}"
run_test "AuthContext exists" "test -f src/context/AuthContext.jsx"
run_test "RoleBasedHome exists" "test -f src/components/RoleBasedHome.jsx"
run_test "Student detail page exists" "test -f src/app/students/[id]/page.jsx"
run_test "Students data exists" "test -f src/data/students.js"
run_test "Mock users exist" "test -f src/data/mockUsers.js"

# 3. Check NextAuth configuration
echo -e "${YELLOW}🔐 Checking authentication setup...${NC}"
run_test "NextAuth route exists" "test -f src/app/api/auth/[...nextauth]/route.js"
run_test "Login page exists" "test -f src/app/auth/login/page.jsx"

# 4. Run syntax checks
echo -e "${YELLOW}🔍 Running syntax checks...${NC}"
run_test "ESLint check" "npm run lint --silent"
run_test "TypeScript check" "npx tsc --noEmit --skipLibCheck"

# 5. Run unit tests
echo -e "${YELLOW}🧪 Running unit tests...${NC}"
run_test "Auth form tests" "npm test -- --testPathPatterns=AuthForm.test.jsx --passWithNoTests"
run_test "Critical features tests" "npm test -- --testPathPatterns=critical-features.test.jsx --passWithNoTests"

# 6. Build test
echo -e "${YELLOW}🏗️  Testing build process...${NC}"
run_test "Production build" "npm run build"

# 7. Check for common issues
echo -e "${YELLOW}🔧 Checking for common issues...${NC}"
run_test "No console.log in production" "! grep -r 'console.log' src/ --include='*.jsx' --include='*.js' || true"
run_test "No TODO comments" "! grep -r 'TODO' src/ --include='*.jsx' --include='*.js' || true"

# Results summary
echo ""
echo "📊 TEST RESULTS SUMMARY"
echo "======================="
echo -e "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo -e "${GREEN}✅ Passed: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Failed: $TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo -e "${GREEN}✨ System is ready for testing${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Start development server: npm run dev"
    echo "2. Open http://localhost:3000"
    echo "3. Test login with: admin@lumina.com / admin123"
    echo "4. Navigate to /students to test student management"
    echo "5. Check /students/1 for student detail page"
    exit 0
else
    echo ""
    echo -e "${RED}⚠️  SOME TESTS FAILED${NC}"
    echo -e "${YELLOW}Please fix the issues above before proceeding${NC}"
    exit 1
fi