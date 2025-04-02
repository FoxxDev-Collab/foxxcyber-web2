import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'default', 
    className = '',
    children, 
    ...props 
  }, ref) => {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? '' : `btn-${variant}`;
    const sizeClass = size !== 'default' ? `btn-${size}` : '';
    
    const buttonClass = [
      baseClass,
      variantClass,
      sizeClass,
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={buttonClass}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 