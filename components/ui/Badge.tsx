import React from 'react';
import { cn } from '../../utils/formatting';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'promo';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-grayMedium text-white',
    success: 'bg-success text-white', // NOVO
    warning: 'bg-warning text-blackCarbon font-bold', // USADO
    promo: 'bg-primaryDark text-white', // PROMOÇÃO
  };

  return (
    <span className={cn('inline-flex items-center rounded-[4px] px-2 py-1 text-[10px] font-subheading uppercase tracking-wider shadow-sm', variants[variant], className)}>
      {children}
    </span>
  );
};