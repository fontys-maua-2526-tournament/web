import { useState, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function CustomDateTimePicker({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  blocked = false,
  className = '',
  disabled = false,
  size = 'md',
  inputProps = {},
}) {
  const sizeClasses = size === 'lg' ? 'px-6 py-4 text-xl' : 'px-4 py-2 text-lg';
  const isBlocked = blocked === true;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  const wrapperRef = useRef(null);

  // Parse the incoming value WITHOUT using new Date()
  useEffect(() => {
    if (!value) return;

    const [d, t] = value.split('T');
    const [h, m] = t?.split(':') ?? [];

    setDate(d || '');
    setHour(h || '00');
    setMinute(m || '00');
  }, [value]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function updateValue(newDate, newHour, newMinute) {
    if (!newDate) return;

    // Build a timezone-safe string
    const final = `${newDate}T${newHour}:${newMinute}`;

    if (!isBlocked && onChange) {
      onChange(final);
    }
  }

  // Format display WITHOUT timezone conversion
  function getDisplayValue() {
    if (!value) return '';

    const [d, t] = value.split('T');
    const [year, month, day] = d.split('-');
    const [h, m] = t.split(':');

    return `${day}/${month}/${year} ${h}:${m}`;
  }

  return (
    <div className={`w-full ${className}`} ref={wrapperRef}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-lg font-medium text-gray-600">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type="text"
          value={getDisplayValue()}
          onClick={() => !isBlocked && setOpen(true)}
          placeholder={placeholder}
          readOnly
          disabled={disabled || isBlocked}
          className={`w-full rounded-2xl border border-gray-300 bg-white pr-12 ${sizeClasses} focus:ring-mauaBlue focus:ring-2 focus:outline-none ${isBlocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          {...inputProps}
        />

        {isBlocked && (
          <div className="absolute right-3 flex h-10 w-10 items-center justify-center text-gray-500">
            <Lock size={18} />
          </div>
        )}

        {open && !isBlocked && (
          <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-4">
              {/* Date */}
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 p-2"
                value={date}
                onChange={e => {
                  const newDate = e.target.value;
                  setDate(newDate);
                  updateValue(newDate, hour, minute);
                }}
              />

              {/* Time */}
              <div className="flex items-center justify-between gap-4">
                {/* Hour */}
                <select
                  value={hour}
                  className="w-1/2 rounded-md border border-gray-300 p-2"
                  onChange={e => {
                    const h = e.target.value;
                    setHour(h);
                    updateValue(date, h, minute);
                  }}
                >
                  {Array.from({ length: 24 }, (_, h) => (
                    <option key={h} value={String(h).padStart(2, '0')}>
                      {String(h).padStart(2, '0')}
                    </option>
                  ))}
                </select>

                <span className="font-semibold text-gray-600">:</span>

                {/* Minute */}
                <select
                  value={minute}
                  className="w-1/2 rounded-md border border-gray-300 p-2"
                  onChange={e => {
                    const m = e.target.value;
                    setMinute(m);
                    updateValue(date, hour, m);
                  }}
                >
                  {Array.from({ length: 60 }, (_, m) => (
                    <option key={m} value={String(m).padStart(2, '0')}>
                      {String(m).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  if (typeof onChange === 'function') {
                    onChange({ target: { value: `${date}T${hour}:${minute}` } });
                  }
                  setOpen(false);
                }}
                className="bg-mauaBlue w-full rounded-lg py-2 text-white hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
