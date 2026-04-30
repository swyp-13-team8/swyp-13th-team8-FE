// 상단 브레드크럼(이전이동: 디자인협의 필요)

import { useNavigate } from 'react-router';

interface BreadcrumbProps {
  label?: string;
}

const CBreadcrumb = ({ label }: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 cursor-pointer mt-4 " onClick={() => navigate(-1)}>
      <span className="text-gray-scale-50 text-body-s-r">{'<'}</span>
      <span className="text-gray-scale-50 text-body-s-r">{label}</span>
    </div>
  );
};

export default CBreadcrumb;
