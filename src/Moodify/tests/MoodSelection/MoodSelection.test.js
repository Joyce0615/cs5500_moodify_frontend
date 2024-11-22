import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MoodSelection from '../../MoodSelection/MoodSelection';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('MoodSelection Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    mockNavigate.mockClear();
  });

  test('renders MoodSelection component correctly', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    // Check main headings
    expect(screen.getByText(/What mood are you in?/i)).toBeInTheDocument();
    expect(screen.getByText(/Select up to 3 moods/i)).toBeInTheDocument();
    
    // Check that some mood options are present
    const expectedMoods = ['Happy', 'Sad', 'Angry', 'Calm', 'Relaxed'];
    expectedMoods.forEach(mood => {
      expect(screen.getByText(mood)).toBeInTheDocument();
    });

    // Check that navigation buttons are present
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  test('allows single mood selection', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    const happyMood = screen.getByText('Happy');
    fireEvent.click(happyMood);
    expect(happyMood.closest('.mood-item')).toHaveClass('active');
  });

  test('allows multiple mood selections up to 3', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    const moods = ['Happy', 'Sad', 'Angry', 'Calm'];
    
    // Select 4 moods
    moods.forEach(mood => {
      fireEvent.click(screen.getByText(mood));
    });

    // Check that only first 3 are selected
    expect(screen.getByText('Happy').closest('.mood-item')).toHaveClass('active');
    expect(screen.getByText('Sad').closest('.mood-item')).toHaveClass('active');
    expect(screen.getByText('Angry').closest('.mood-item')).toHaveClass('active');
    expect(screen.getByText('Calm').closest('.mood-item')).not.toHaveClass('active');
  });

  test('handles mood deselection', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    const happyMood = screen.getByText('Happy');
    
    // Select and then deselect
    fireEvent.click(happyMood);
    expect(happyMood.closest('.mood-item')).toHaveClass('active');
    
    fireEvent.click(happyMood);
    expect(happyMood.closest('.mood-item')).not.toHaveClass('active');
  });

  test('saves selected moods to localStorage', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    const happyMood = screen.getByText('Happy');
    const calmMood = screen.getByText('Calm');
    
    fireEvent.click(happyMood);
    fireEvent.click(calmMood);
    
    const savedMoods = JSON.parse(localStorage.getItem('selectedMoods'));
    expect(savedMoods).toEqual(['Happy', 'Calm']);
  });

  test('navigates to next page when clicking Next with valid selection', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    // Select a mood
    fireEvent.click(screen.getByText('Happy'));
    
    // Click Next
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/Moodify/ActivitySelection');
  });

  test('loads previously selected moods from localStorage', () => {
    // Set up localStorage with pre-selected moods
    localStorage.setItem('selectedMoods', JSON.stringify(['Happy', 'Calm']));
    
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    // Find the mood-item divs that contain the text
    const happyMoodItem = screen.getByText('Happy').closest('.mood-item');
    const calmMoodItem = screen.getByText('Calm').closest('.mood-item');
    
    expect(happyMoodItem).toHaveClass('active');
    expect(calmMoodItem).toHaveClass('active');
  });

  test('disables Next button when no mood is selected', () => {
    render(
      <MemoryRouter>
        <MoodSelection />
      </MemoryRouter>
    );
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });
});
