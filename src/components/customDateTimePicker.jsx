import { Lock } from '@phosphor-icons/react';

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
  readOnly = false,
  showCopy = false,
  size = 'md', // md | lg
  inputProps = {},
}) {

  const sizeClasses = size === 'lg' ? 'px-6 py-4 text-xl' : 'px-4 py-2 text-lg';
  const isBlocked = blocked === true;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-lg font-medium text-gray-600">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type="datetime-local"
          value={value}
          onChange={isBlocked ? undefined : onChange}
          placeholder={placeholder}
          readOnly={readOnly || isBlocked}
          disabled={disabled || isBlocked}
          aria-disabled={isBlocked}
          className={`w-full rounded-2xl border border-gray-300 bg-white pr-12 ${sizeClasses} focus:ring-mauaBlue focus:ring-2 focus:outline-none ${isBlocked ? 'cursor-not-allowed opacity-60' : ''}`}
          {...inputProps}
        />

        {isBlocked ? (
          <div className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-gray-500">
            <Lock size={18} />
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}
