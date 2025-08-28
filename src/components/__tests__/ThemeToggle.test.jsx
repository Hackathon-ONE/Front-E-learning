import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from 'next-themes';

// Mock the next-themes module
jest.mock('next-themes');

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Default mock implementation
    useTheme.mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light'
    }));
  });

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    render(<ThemeToggle />);
    const moonIcon = screen.getByTestId('moon-icon');
    expect(moonIcon).toBeInTheDocument();
  });

  it('shows sun icon in dark mode', () => {
    useTheme.mockImplementation(() => ({
      theme: 'dark',
      setTheme: mockSetTheme,
      systemTheme: 'dark'
    }));
    
    render(<ThemeToggle />);
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
