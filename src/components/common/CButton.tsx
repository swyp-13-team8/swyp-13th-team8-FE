import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const CButton = ({ children, className = '', variant, size = 'sm', ...props }: ButtonProps) => {
  // 기본 스타일 지정
  const baseStyle = 'items-center justify-center rounded-xl transition-colors';

  // 종류에 따른 스타일 지정(변경)
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    tertiary: 'bg-primary-10 text-primary-50 hover:bg-primary-20',
    danger: 'bg-red-600 text-gray-200 hover:bg-red-700',
  };

  // 크기에 따른 크기 지정 (변경)
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button className={`${baseStyle} ${variant ? variants[variant] : ''} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default CButton;
