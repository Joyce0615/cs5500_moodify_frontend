import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from '../../Navigation/NavigationBar';

describe('NavigationBar Component', () => {
  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    // Check for the presence of navigation links
    expect(screen.getByRole('img', { name: 'Moodify Logo' })).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('highlights active link', () => {
    render(
      <MemoryRouter initialEntries={['/Moodify/Login']}>
        <NavigationBar />
      </MemoryRouter>
    );

    const loginLink = screen.getByText('Login').closest('a');
    expect(loginLink).toHaveClass('list-group-item', 'active-link');
  });
});
