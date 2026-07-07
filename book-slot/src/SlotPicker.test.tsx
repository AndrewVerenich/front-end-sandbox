import { render, screen, fireEvent } from '@testing-library/react';
import SlotPicker from './SlotPicker';

describe('SlotPicker', () => {
  const slots = [
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
  ];

  it('renders available and disabled slots', () => {
    render(<SlotPicker slots={slots} selectedTime={null} onSelect={() => {}} />);

    expect(screen.getByText('09:00')).toBeEnabled();
    expect(screen.getByText('10:00')).toBeDisabled();
    expect(screen.getByText('11:00')).toBeEnabled();
  });

  it('calls onSelect when available slot is clicked', () => {
    const onSelect = vi.fn();
    render(<SlotPicker slots={slots} selectedTime={null} onSelect={onSelect} />);

    fireEvent.click(screen.getByText('11:00'));
    expect(onSelect).toHaveBeenCalledWith('11:00');
  });
});
