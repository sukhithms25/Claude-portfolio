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
      background: '#F05A17',
      border: '1px solid #FF7A1A',
      boxShadow: '0 0 15px rgba(240,90,23,0.25), 0 4px 15px rgba(0,0,0,0.5)',
      color: '#FFFFFF',
    },
    secondary: {
      background: '#101418',
      border: '1px solid #1D2125',
      color: '#E6E3DF',
    },
    ghost: {
      color: '#A8A29C',
    },
    outline: {
      border: '1px solid #1D2125',
      color: '#A8A29C',
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
