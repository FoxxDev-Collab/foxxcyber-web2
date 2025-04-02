import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  labelClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    checked, 
    onChange,
    className = '',
    labelClassName = '',
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || `checkbox-${generatedId}`;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    };

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={`checkbox ${className}`}
          {...props}
        />
        {label && (
          <label 
            htmlFor={inputId}
            className={`label ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 