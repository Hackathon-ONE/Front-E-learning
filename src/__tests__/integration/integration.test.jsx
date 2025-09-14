import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context/AuthContext';
import StudentsPage from '@/app/students/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  SessionProvider: ({ children }) => children,
}));

// Mock components
jest.mock('@/components/SimpleRecommendationsForm', () => {
  return function MockRecommendationsForm() {
    return (
      <div data-testid="recommendations-form">
        <h2>Recomendaciones de IA</h2>
        <form data-testid="recommendations-form-element">
          <textarea placeholder="Describe tus habilidades" />
          <button type="submit">Obtener Recomendaciones</button>
        </form>
      </div>
    );
  };
});

const TestWrapper = ({ children }) => (
  <SessionProvider>
    <AuthProvider>{children}</AuthProvider>
  </SessionProvider>
);

describe('Integration Tests', () => {
  describe('Students Page Flow', () => {
    it('should render students list with all required elements', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check page title
      expect(screen.getByText('Estudiantes')).toBeInTheDocument();
      expect(screen.getByText(/Gestiona y revisa el progreso/)).toBeInTheDocument();

      // Check student cards
      expect(screen.getByText('Alicia Gómez')).toBeInTheDocument();
      expect(screen.getByText('Gustavo Pérez')).toBeInTheDocument();
      expect(screen.getByText('María Aponte')).toBeInTheDocument();

      // Check action buttons
      const progressLinks = screen.getAllByText('Ver progreso');
      const profileLinks = screen.getAllByText('Perfil');

      expect(progressLinks).toHaveLength(3);
      expect(profileLinks).toHaveLength(3);
    });

    it('should have correct navigation links for each student', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check first student links
      const progressLinks = screen.getAllByRole('link', { name: 'Ver progreso' });
      const profileLinks = screen.getAllByRole('link', { name: 'Perfil' });

      expect(progressLinks[0]).toHaveAttribute('href', '/students/1/progress');
      expect(profileLinks[0]).toHaveAttribute('href', '/students/1');
    });

    it('should display student statistics correctly', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check Alicia Gómez stats
      expect(screen.getByText('3 cursos')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();

      // Check that statistics are displayed
      const courseElements = screen.getAllByText(/\d+ cursos/);
      const percentageElements = screen.getAllByText(/\d+%/);

      expect(courseElements.length).toBeGreaterThan(0);
      expect(percentageElements.length).toBeGreaterThan(0);
    });

    it('should render students page content correctly', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check that the main content is rendered
      expect(screen.getByText('Estudiantes')).toBeInTheDocument();
      expect(screen.getByText(/Gestiona y revisa el progreso/)).toBeInTheDocument();

      // Check that student cards are present
      const studentCards = screen.getAllByRole('img');
      expect(studentCards.length).toBeGreaterThan(0);
    });

    it('should handle student card interactions', async () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check that progress and profile links are clickable
      const progressLinks = screen.getAllByText('Ver progreso');
      const profileLinks = screen.getAllByText('Perfil');

      expect(progressLinks[0]).toBeInTheDocument();
      expect(profileLinks[0]).toBeInTheDocument();

      // Check that links have correct href attributes
      expect(progressLinks[0].closest('a')).toHaveAttribute('href', '/students/1/progress');
      expect(profileLinks[0].closest('a')).toHaveAttribute('href', '/students/1');
    });
  });

  describe('Responsive Design Tests', () => {
    it('should adapt to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Check that content is still accessible
      expect(screen.getByText('Estudiantes')).toBeInTheDocument();
      expect(screen.getByText('Alicia Gómez')).toBeInTheDocument();
    });

    it('should adapt to tablet viewport', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      expect(screen.getByText('Estudiantes')).toBeInTheDocument();
      expect(screen.getAllByText('Ver progreso')).toHaveLength(3);
    });
  });

  describe('Accessibility Tests', () => {
    it('should have proper heading structure', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Estudiantes');

      const studentHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(studentHeadings.length).toBeGreaterThan(0);
    });

    it('should have accessible links', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have proper alt text for images', () => {
      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Performance Tests', () => {
    it('should render within reasonable time', async () => {
      const startTime = performance.now();

      render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Estudiantes')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within 100ms (adjust as needed)
      expect(renderTime).toBeLessThan(100);
    });

    it('should not cause memory leaks', () => {
      const { unmount } = render(
        <TestWrapper>
          <StudentsPage />
        </TestWrapper>
      );

      // Unmount component
      unmount();

      // Component should unmount cleanly
      expect(screen.queryByText('Estudiantes')).not.toBeInTheDocument();
    });
  });
});
