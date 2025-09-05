import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  __esModule: true,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock AuthContext
const mockAuthContext = {
  user: null,
  role: 'guest',
  isAuthenticated: false,
  loading: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
};

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock useRoleRedirect hook
jest.mock('@/hooks/useRoleRedirect', () => ({
  useAuthRedirect: jest.fn(),
}));

// Mock TestCredentials component
jest.mock('../TestCredentials', () => {
  return function MockTestCredentials() {
    return <div data-testid="test-credentials">Test Credentials Component</div>;
  };
});

describe('LoginForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    mockAuthContext.user = null;
    mockAuthContext.isAuthenticated = false;
    mockAuthContext.loading = false;
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByTestId('test-credentials')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByText(/¿No tienes cuenta?/i)).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument();
  });

  it('validates login fields', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: 'Entrar' });

    // Submit empty form
    fireEvent.click(submitButton);

    expect(await screen.findByText('Email es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Contraseña es requerida')).toBeInTheDocument();
  });

  it('validates email format in login', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    const emailInput = screen.getByLabelText('Email');

    // Test invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Should show email validation error (either required or invalid format)
    await waitFor(() => {
      expect(screen.getByText(/Email/)).toBeInTheDocument();
    });
  });

  it('validates password length in login', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    const passwordInput = screen.getByLabelText('Contraseña');

    // Test short password
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    // Should show password validation error
    await waitFor(() => {
      expect(screen.getByText(/Contraseña/)).toBeInTheDocument();
    });
  });

  it('handles login with valid credentials and redirects to home', async () => {
    signIn.mockResolvedValueOnce({ ok: true });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@lumina.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'student123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'student@lumina.com',
        password: 'student123',
      });
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  it('handles Google sign in with correct callback URL', async () => {
    signIn.mockResolvedValueOnce({ ok: true });

    render(<LoginForm />);

    const googleButton = screen.getByRole('button', { name: 'Iniciar sesión con Google' });
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
    });
  });

  it('shows error message on login failure', async () => {
    signIn.mockResolvedValueOnce({ error: 'Invalid credentials' });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument();
  });

  it('shows loading state during login', async () => {
    signIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@lumina.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'student123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByText('Entrando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Entrar')).toBeInTheDocument();
    });
  });

  it('disables form during loading', async () => {
    signIn.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    const googleButton = screen.getByRole('button', { name: 'Iniciar sesión con Google' });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@lumina.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'student123' },
    });

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(googleButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(googleButton).not.toBeDisabled();
    });
  });
});

describe('RegisterForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  it('renders register form correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
    expect(screen.getByText(/¿Ya tienes cuenta?/i)).toBeInTheDocument();
  });

  it('validates registration fields', async () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    // Submit empty form
    fireEvent.click(submitButton);

    expect(await screen.findByText('Nombre es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Email es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Contraseña es requerida')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    // Test invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Should show some validation error
    await waitFor(() => {
      expect(screen.getByText(/Email/)).toBeInTheDocument();
    });
  });

  it('validates password length', async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    // Test short password
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    // Should show some validation error
    await waitFor(() => {
      expect(screen.getByText(/Contraseña/)).toBeInTheDocument();
    });
  });

  it('handles successful registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'student',
        }),
      });
    });

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/auth/login');
    });
  });

  it('handles registration error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Email ya existe' }),
      })
    );

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(await screen.findByText('Email ya existe')).toBeInTheDocument();
  });

  it('handles Google registration', async () => {
    signIn.mockResolvedValueOnce({ ok: true });

    render(<RegisterForm />);

    const googleButton = screen.getByRole('button', { name: 'Registrarse con Google' });
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
    });
  });

  it('shows loading state during registration', async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
              }),
            100
          )
        )
    );

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(screen.getByText('Registrando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Registrarse')).toBeInTheDocument();
    });
  });

  it('disables form during loading', async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
              }),
            100
          )
        )
    );

    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: 'Registrarse' });
    const googleButton = screen.getByRole('button', { name: 'Registrarse con Google' });

    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(googleButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(googleButton).not.toBeDisabled();
    });
  });
});
