import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivitySelection from '../../../Moodify/MoodSelection/ActivitySelection';

describe('ActivitySelection Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test to prevent state leakage
    localStorage.clear();
  });

  test('renders ActivitySelection component correctly', () => {
    render(
      <MemoryRouter>
        <ActivitySelection />
      </MemoryRouter>
    );

    // Verify the presence of headings and instructions
    expect(screen.getByText(/What are you currently doing\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Select your current activity/i)).toBeInTheDocument();

    // Verify activity options are rendered
    const activities = ['Working', 'Studying', 'Exercising', 'Relaxing'];
    activities.forEach(activity => {
      expect(screen.getByText(new RegExp(activity, 'i'))).toBeInTheDocument();
    });

    // Verify "Next" button is present and disabled
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('handles activity selection correctly', () => {
    render(
      <MemoryRouter>
        <ActivitySelection />
      </MemoryRouter>
    );

    // Select an activity
    const workingOption = screen.getByText(/Working/i);
    fireEvent.click(workingOption);

    // Verify that the selected activity has the 'active' class
    expect(workingOption.closest('.mood-item')).toHaveClass('active');
  });

  test('displays validation through disabled button when no selection', () => {
    render(
      <MemoryRouter>
        <ActivitySelection />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // Initial state - button should be disabled
    expect(nextButton).toBeDisabled();

    // Select an activity
    const workingOption = screen.getByText(/Working/i);
    fireEvent.click(workingOption);
    
    // After selection - button should be enabled
    expect(nextButton).not.toBeDisabled();
  });
});
