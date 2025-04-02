import React from 'react';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ 
    label, 
    htmlFor, 
    description, 
    error,
    className = '',
    children,
    ...props 
  }, ref) => {
    return (
      <div 
        ref={ref}
        className={`form-group ${className}`}
        {...props}
      >
        {label && (
          <label 
            htmlFor={htmlFor}
            className="label"
          >
            {label}
          </label>
        )}
        {children}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export default FormGroup; 