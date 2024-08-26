import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPanel from './LoginPanel';
import AuthService from '@/service/authService';
import useAuth from '@/hooks/useAuth';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';


jest.mock('@/service/authService');
jest.mock('@/hooks/useAuth');
jest.mock('../../config', () => ({
  API_DOMAIN: 'http://localhost:3000',
}));

describe('LoginPanel Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      saveToken: jest.fn(),
    });
  });

  // login routes
  test('renders LoginPanel with login button', () => {
    render(<LoginPanel />);
    expect(screen.getByTestId('open-login-button')).toBeInTheDocument();
  });

  test('opens dialog when clicking LOGIN button', () => {
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));
    expect(screen.getByText(/Please enter your credentials to continue/i)).toBeInTheDocument();
  });

  test('renders login form with username and password fields', () => {
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  test('displays error message when no username or password is provided', async () => {
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a username and password');
  });

  test('logs in user successfully', async () => {
    (AuthService.login as jest.Mock).mockResolvedValue({ token: 'test-token' });
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '6@:;£V64YmvC' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith('testuser', '6@:;£V64YmvC');
      expect(useAuth().saveToken).toHaveBeenCalledWith('test-token');
    });
  });

  test('displays error when login fails', async () => {
    const errorResponse = {
      data: { error: 'Invalid credentials' },
    };

    const axiosError = new AxiosError(
      'Request failed with status code 401',
      'ERR_BAD_REQUEST',
      {} as InternalAxiosRequestConfig,
      null,
      {
        ...errorResponse,
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      }
    );

    (AuthService.login as jest.Mock).mockRejectedValue(axiosError);

    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid credentials');
    });
  });

  // register routes
  test('toggles between login and register mode', () => {
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));

    // initially in login mode
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Login');

    // toggle to register mode
    fireEvent.click(screen.getByTestId('toggle-register-button'));
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Register');

    // toggle back to login mode
    fireEvent.click(screen.getByTestId('toggle-register-button'));
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Login');
  });

  test('registers a new user successfully', async () => {
    (AuthService.register as jest.Mock).mockResolvedValue({ token: 'register-token' });
    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));

    // toggle to Register mode
    fireEvent.click(screen.getByTestId('toggle-register-button'));

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'P@ssword1' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith('newuser', 'P@ssword1');
      expect(useAuth().saveToken).toHaveBeenCalledWith('register-token');
    });
  });

  test('displays error when registration fails', async () => {
    const errorResponse = {
      data: { error: 'Username already exists' },
    };

    const axiosError = new AxiosError(
      'Request failed with status code 409',
      'ERR_CONFLICT',
      {} as InternalAxiosRequestConfig,
      null,
      {
        ...errorResponse,
        status: 409,
        statusText: 'Conflict',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      }
    );

    (AuthService.register as jest.Mock).mockRejectedValue(axiosError);

    render(<LoginPanel />);
    fireEvent.click(screen.getByTestId('open-login-button'));

    // toggle to Register mode
    fireEvent.click(screen.getByTestId('toggle-register-button'));

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'zcog' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'P@ssword1' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Username already exists');
    });
  });
});