import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  it('shows client validation errors', () => {
    render(<BookingForm onSubmit={() => {}} submitting={false} />);

    fireEvent.click(screen.getByRole('button', { name: 'Confirm booking' }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows server errors from API', () => {
    render(
      <BookingForm
        onSubmit={() => {}}
        submitting={false}
        serverErrors={{ email: ['Server says no'] }}
      />,
    );

    expect(screen.getByText('Server says no')).toBeInTheDocument();
  });
});
