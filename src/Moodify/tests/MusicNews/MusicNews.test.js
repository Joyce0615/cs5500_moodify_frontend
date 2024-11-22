import React from 'react';
import { render, screen } from '@testing-library/react';
import MusicNews from '../../MusicNews/MusicNews';

describe('MusicNews Component', () => {
  test('renders MusicNews component correctly', () => {
    render(<MusicNews />);
    expect(screen.getByText(/Today's Music News/i)).toBeInTheDocument();
  });

  test('displays news cards', async () => {
    render(<MusicNews />);
    const newsCards = await screen.findAllByRole('link', { name: /Read more/i });
    expect(newsCards.length).toBeGreaterThan(0);
  });
});
