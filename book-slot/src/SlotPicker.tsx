import type { TimeSlot } from './types';

interface SlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

function SlotPicker({ slots, selectedTime, onSelect }: SlotPickerProps) {
  if (slots.length === 0) {
    return <p className="text-slate-400">No slots for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => {
        const isSelected = selectedTime === slot.time;
        const isDisabled = !slot.available;

        return (
          <button
            key={slot.time}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelect(slot.time)}
            className={
              isDisabled
                ? 'cursor-not-allowed rounded border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-600'
                : isSelected
                  ? 'rounded border border-sky-500 bg-sky-600 px-2 py-2 text-sm text-white'
                  : 'rounded border border-slate-600 bg-slate-800 px-2 py-2 text-sm hover:border-sky-500'
            }
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );
}

export default SlotPicker;
