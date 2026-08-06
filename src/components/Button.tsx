import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  href,
  className = '',
  icon,
  iconPosition = 'right',
  fullWidth = false,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    px-6 py-3 rounded-full font-medium text-sm
    transition-all duration-300 ease-out
    cursor-pointer select-none whitespace-nowrap
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: `
      text-white
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      hover:bg-white/5
      hover:-translate-y-0.5
    `,
    ghost: `
      bg-transparent text-slate-300
      hover:text-white hover:bg-white/5
    `,
    outline: `
      bg-transparent text-slate-300
      hover:-translate-y-0.5
    `,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #163832 0%, #235347 60%, #8EB69B 100%)',
      border: '1px solid rgba(142,182,155,0.3)',
      boxShadow: '0 0 20px rgba(142,182,155,0.2), 0 4px 15px rgba(0,0,0,0.4)',
    },
    secondary: {
      background: 'rgba(35,83,71,0.3)',
      border: '1px solid rgba(142,182,155,0.25)',
      color: '#8EB69B',
    },
    ghost: {},
    outline: {
      border: '1px solid rgba(142,182,155,0.2)',
      color: '#8EB69B',
    },
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  const inlineStyle = variantStyles[variant] ?? {};

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} style={inlineStyle} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} style={inlineStyle}>
      {content}
    </button>
  );
};
