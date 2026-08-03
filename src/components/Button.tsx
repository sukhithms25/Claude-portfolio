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
      bg-gradient-to-r from-sky-500 to-indigo-500
      text-white
      shadow-[0_0_20px_rgba(14,165,233,0.3),0_4px_15px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_30px_rgba(14,165,233,0.5),0_8px_25px_rgba(0,0,0,0.4)]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-white/5 text-sky-300 border border-sky-500/30
      hover:bg-white/10 hover:border-sky-500/50
      hover:-translate-y-0.5
    `,
    ghost: `
      bg-transparent text-slate-300
      hover:text-white hover:bg-white/5
    `,
    outline: `
      bg-transparent border border-slate-600 text-slate-300
      hover:border-sky-500/50 hover:text-sky-300
      hover:-translate-y-0.5
    `,
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
