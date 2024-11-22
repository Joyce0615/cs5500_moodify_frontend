import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';
import Profile from '../../Profile/Profile';

// Mock the entire react-router-dom module
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Profile Component', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset fetch mock before each test
    jest.resetAllMocks();
    // Clear navigate mock
    mockNavigate.mockClear();
  });

  test('handles logout correctly', async () => {
    // Mock profile data
    const mockProfile = {
      username: 'testuser',
      email: 'test@example.com',
      img: '/images/profile.jpg'
    };

    const mockLikedSongs = [];  // Empty array for liked songs

    // Mock fetch calls
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProfile)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLikedSongs)
      }));

    localStorage.setItem('user', 'testuser');

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // Now find and click logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Verify logout actions
    expect(localStorage.getItem('user')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/Moodify/Login');
  });
});
