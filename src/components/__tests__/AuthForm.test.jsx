/* import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { useSession, signIn } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  __esModule: true,
}));

// Mock AuthContext
const mockLogin = jest.fn();
const mockRegister = jest.fn();

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(), // Ahora sí es un jest.fn()
}));

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSession.mockReturnValue({ data: null });
    signIn.mockResolvedValue({ ok: true });
    useAuth.mockReturnValue({ login: mockLogin, register: mockRegister });
  });

  it('renders login form by default', async () => {
    render(<LoginForm />);

    expect(await screen.findByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
  });

  it('renders register form when isRegister is true', async () => {
    render(<RegisterForm isRegister={true} />);

    expect(await screen.findByText('Registro')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
    expect(screen.getByText(/¿ya tienes cuenta\?/i)).toBeInTheDocument();
  });

  it('validates login fields', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Email es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Contraseña es requerida')).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Email no es válido')).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Debe tener al menos 6 caracteres')).toBeInTheDocument();
  });

  it('calls login with correct credentials', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('calls register with correct data', async () => {
    render(<RegisterForm isRegister={true} />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('toggles between login and register forms', async () => {
    render(<LoginForm />);

    expect(await screen.findByText('Iniciar sesión')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/regístrate/i));

    expect(await screen.findByText('Registro')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  it('shows user info when logged in', async () => {
    useSession.mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          image: 'https://example.com/avatar.jpg',
        },
      },
    });

    render(<LoginForm />);

    expect(await screen.findByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls signIn with Google provider', async () => {
    render(<LoginForm />);

    const googleButton = screen.getByRole('button', { name: 'Iniciar sesión con Google' });
    fireEvent.click(googleButton);

    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });
  });
});
 */