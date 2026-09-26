import { type InputHTMLAttributes, useId } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label: string;
  name: string;
  multiline?: boolean;
  rows?: number;
}

export const Input = ({
  label,
  name,
  multiline = false,
  rows = 5,
  className = '',
  id,
  ...props
}: InputProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const generatedId = useId();
  const inputId = id ?? `${generatedId}-${name}`;
  const errorId = `${inputId}-error`;

  const a11yProps = {
    id: inputId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  };

  const inputStyles = `w-full rounded-md border px-3 py-2 transition-all ${
    error
      ? 'border-red-500 focus:border-red-500'
      : 'border-gray-300 dark:border-gray-700 focus:border-primary-light dark:focus:border-primary-dark'
  } bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none ${className}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <Controller
        name={name}
        render={({ field }) =>
          multiline ? (
            <textarea
              {...field}
              {...props}
              {...a11yProps}
              rows={rows}
              className={`${inputStyles} resize-none`}
            />
          ) : (
            <input
              {...field}
              {...props}
              {...a11yProps}
              className={inputStyles}
            />
          )
        }
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-500">
          {error.message as string}
        </p>
      )}
    </div>
  );
};
