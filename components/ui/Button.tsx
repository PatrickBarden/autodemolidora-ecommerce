import React from 'react';
import { cn } from '../../utils/formatting';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryDark shadow-md border border-transparent uppercase font-bold tracking-wide',
    secondary: 'bg-grayMedium text-white hover:bg-grayDark hover:border-primary border border-transparent shadow-sm',
    outline: 'border-2 border-grayMedium text-grayLight hover:border-primary hover:text-primary bg-transparent',
    ghost: 'text-grayLight hover:bg-grayMedium hover:text-white',
    danger: 'bg-red-700 text-white hover:bg-red-800',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-8 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-[4px] font-heading transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blackCarbon disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};