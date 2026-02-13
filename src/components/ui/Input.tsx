import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
        const errorId = `${inputId}-error`;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-bold text-slate-700 ml-0.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={`
            px-4 py-2.5 rounded-lg border border-slate-300 bg-white 
            focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 
            outline-none transition-all text-sm placeholder:text-slate-400
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-100' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <span id={errorId} className="text-xs font-semibold text-red-600 ml-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
