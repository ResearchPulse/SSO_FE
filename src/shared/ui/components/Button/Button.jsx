import { forwardRef } from 'react';

const variantClassMap = {
  primary: 'btn-primary-glow',
  dark: 'btn-dark-solid',
  outline: 'btn-outline-secondary',
};

const Button = forwardRef(function Button({
  variant = 'primary',
  size,
  className = '',
  children,
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}, ref) {
  const sizeClass = size ? `btn-${size}` : '';
  const variantClass = variantClassMap[variant] || `btn-${variant}`;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {loading && <span className="button-spinner" role="status" aria-label="Đang xử lý" />}
      {children}
    </button>
  );
});

export default Button;
