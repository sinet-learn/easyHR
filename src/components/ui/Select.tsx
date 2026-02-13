import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, id, ...props }, ref) => {
        const selectId = id || props.name || Math.random().toString(36).substr(2, 9);
        const errorId = `${selectId}-error`;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="text-sm font-bold text-slate-700 ml-0.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : undefined}
                        className={`
              w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white 
              focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 
              outline-none transition-all text-sm appearance-none cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-100' : ''}
              ${className}
            `}
                        {...props}
                    >
                        <option value="" disabled>Select an option</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {error && (
                    <span id={errorId} className="text-xs font-semibold text-red-600 ml-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
