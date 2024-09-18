
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { vi } from 'vitest';

describe('LoginForm Component', () => {
  beforeAll(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders the form with username and email fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('allows the user to type into the fields', () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

    expect(usernameInput).toHaveValue('JohnDoe');
    expect(emailInput).toHaveValue('johndoe@example.com');
  });

  test('calls alert on form submit with form data', () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Username: JohnDoe, Email: johndoe@example.com');
  });
});
