import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Songs from '../../Songs';

describe('Songs Component', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset fetch mock before each test
    jest.resetAllMocks();
  });

  test('renders Songs component correctly', () => {
    render(
      <MemoryRouter>
        <Songs />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading recommendations/i)).toBeInTheDocument();
  });

  test('handles like/unlike functionality', async () => {
    const mockSongResponse = {
      recommendations: [
        { title: 'Test Song', artist: 'Test Artist', link: 'http://test.com' }
      ]
    };

    // Mock successful fetch for recommendations
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSongResponse)
      }))
      // Mock successful like request
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Song liked successfully' })
      }))
      // Mock successful unlike request if needed
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Song unliked successfully' })
      }));

    localStorage.setItem('user', 'testUser');
    localStorage.setItem('selectedActivity', 'test activity');
    localStorage.setItem('selectedMoods', 'test mood');
    localStorage.setItem('selectedTime', 'test time');
    localStorage.setItem('selectedWeather', 'test weather');

    render(
      <MemoryRouter>
        <Songs />
      </MemoryRouter>
    );

    // Wait for loading to complete and song to render
    await waitFor(() => {
      expect(screen.queryByText(/Loading recommendations/i)).not.toBeInTheDocument();
    });

    // Verify song details are displayed
    const songNameElement = screen.getByText('Test Song');
    const artistElement = screen.getByText('Test Artist');
    expect(songNameElement).toBeInTheDocument();
    expect(artistElement).toBeInTheDocument();

    // Find and click like button
    const likeButton = screen.getByRole('button', { name: /♥/i });
    fireEvent.click(likeButton);

    // Verify like request was made with correct data
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, "http://127.0.0.1:5001/api/recommend", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activity: 'test activity',
        mood: 'test mood',
        time: 'test time',
        weather: 'test weather'
      })
    });
  });

});
