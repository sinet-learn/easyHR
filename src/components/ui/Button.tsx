import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, leftIcon, children, disabled, ...props }, ref) => {

        const variants = {
            primary: 'btn-primary shadow-sm hover:shadow-md transition-shadow duration-200',
            secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
            outline: 'btn-outline border-2',
            ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={`
          btn min-h-[40px] px-5 py-2 rounded-lg font-semibold
          disabled:opacity-40 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
          ${variants[variant]}
          ${className}
        `}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {!isLoading && leftIcon && <span className="flex items-center justify-center shrink-0" aria-hidden="true">{leftIcon}</span>}
                <span className="truncate">{children}</span>
            </button>
        );
    }
);

Button.displayName = 'Button';
