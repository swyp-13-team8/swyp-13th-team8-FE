import { useNavigate } from 'react-router';
import CImg from '../../../../components/common/CImg';
import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import { rightArrow } from '../../../../assets';

const Setting = () => {
  const navigate = useNavigate();

  const serviceItems = [
    { id: 'terms', label: '이용약관' },
    { id: 'privacy', label: '개인정보 처리방침' },
  ];

  const userItems = [
    { id: 'account', label: '계정 설정' },
    { id: 'insurance', label: '내 보험 관리' },
    { id: 'logout', label: '로그아웃' },
    { id: 'withdraw', label: '회원 탈퇴' },
  ];

  const handleClick = (id: string) => {
    if (id === 'logout') {
      // 로그아웃 로직
    }
    // 필요한 항목별 로직 추가
  };

  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '설정' }]} />
      <div className="mt-13">
        <p className="text-title-h3">설정</p>
      </div>

      {/* 서비스 정보 */}
      <div className="mt-6">
        <p className="text-body-s-r text-gray-scale-50 mb-2">서비스 정보</p>
        <div className="rounded-xl bg-gray-scale-5 overflow-hidden">
          {serviceItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-7 bg-primary-0 hover:bg-gray-scale-10 transition-colors ${
                index !== serviceItems.length - 1 ? 'border-b border-gray-scale-20' : ''
              }`}
            >
              <span className="text-body-m-r text-gray-scale-80">{item.label}</span>
              <CImg src={rightArrow} alt="arrow" className="w-4 h-4 opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {/* 사용자 설정 */}
      <div className="mt-6">
        <p className="text-body-s-r text-gray-scale-50 mb-2">사용자 설정</p>
        <div className="rounded-xl bg-gray-scale-5 overflow-hidden">
          {userItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-7 bg-primary-0 hover:bg-gray-scale-10 transition-colors ${
                index !== userItems.length - 1 ? 'border-b border-gray-scale-20' : ''
              }`}
            >
              <span className={`text-body-m-r ${item.id === 'withdraw' ? 'text-red-400' : 'text-gray-scale-80'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Setting;
