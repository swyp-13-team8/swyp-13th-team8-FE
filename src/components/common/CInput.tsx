import { useId, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CInput = ({ type = 'text', className = '', label, error, id, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  // 기본 스타일 지정 (변경 가능)
  const containerStyle = 'flex flex-col gap-1.5 w-full'; // 라벨과 인풋 간격
  const baseStyle = 'w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all';
  const errorStyle = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div className={`${containerStyle}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={`${baseStyle} ${errorStyle} ${className} `} type={type} {...props} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
export default CInput;
