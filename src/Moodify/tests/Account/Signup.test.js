import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../../../Moodify/Account/Signup';

describe('Signup Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  test('renders Signup component correctly', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Check that the title is rendered
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();

    // Check that all required inputs are present
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();

    // Check that the buttons are present
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(signupButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('handles user input correctly', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');

    // Test input changes
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
  });

  test('handles availability check', async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    
    // Simulate typing and blur event
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.blur(usernameInput);

    // You might want to add more specific tests here for the availability check
    // This would require mocking the fetch call
  });

  test('disables signup button when there are errors', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Use getByRole to specifically find the button
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });
    expect(signupButton).toBeEnabled();

    // Simulate an error state
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.blur(usernameInput);

    // Add mock for the availability check that returns an error
    // This would require setting up a mock for the fetch call
  });
});
