import {describe, expect, it} from "vitest";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter.tsx";
import {render, screen} from "@testing-library/react";


describe('Counter Component', () => {
  it('increments counter', async () => {
    const user = userEvent.setup();
    render(<Counter/>);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument()
    await user.click(screen.getByText('+1'));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument()
  })

  it('reset counter', async () => {
    const user = userEvent.setup();
    render(<Counter/>);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument()
    await user.click(screen.getByText('+1'));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument()
    await user.click(screen.getByText('Reset'));
    expect(screen.getByText('Counter: 0')).toBeInTheDocument()
  })

  it('кнопка -1 заблокирована при 0', () => {
    render(<Counter />);
    const decrement = screen.getByText('-1');
    expect(decrement).toBeDisabled();
  });
})