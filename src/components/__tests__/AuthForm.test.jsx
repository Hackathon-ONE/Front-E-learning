/* import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
const mockLogin = jest.fn();
const mockRegister = jest.fn();

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    register: mockRegister,
  }),
}));

describe('LoginForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ user: { role: 'student' } }),
      })
    );
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
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

    // Test invalid email
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Email no es válido')).toBeInTheDocument();

    // Test short password
    const passwordInput = screen.getByLabelText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Debe tener al menos 6 caracteres')).toBeInTheDocument();
  });

  it('handles login with valid credentials', async () => {
    signIn.mockResolvedValueOnce({ ok: true });
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('handles Google sign in', () => {
    render(<LoginForm />);
    
    const googleButton = screen.getByRole('button', { name: 'Iniciar sesión con Google' });
    fireEvent.click(googleButton);

    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/students' });
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
});

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ user: { role: 'student' } }),
      })
    );
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

  it('handles successful registration', async () => {
    mockRegister.mockResolvedValueOnce({ success: true });
    
    render(<RegisterForm />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { 
      target: { value: 'Test User' } 
    });
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), { 
      target: { value: 'password123' } 
    });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
}); */