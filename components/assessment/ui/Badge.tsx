import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'primary',
    className = '',
    children,
    ...props 
  }, ref) => {
    const baseClass = 'badge';
    const variantClass = `badge-${variant}`;
    
    const badgeClass = [
      baseClass,
      variantClass,
      className
    ].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={badgeClass}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge; 