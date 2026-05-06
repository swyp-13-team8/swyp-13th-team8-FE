import { useState } from 'react'; // 상태 관리를 위해 추가
import { useNavigate } from 'react-router';
import { close } from '../../../assets';

interface Insurance {
  id: number;
  company: string;
  name: string;
  type: string;
  date: string;
  logo: string;
}

const MOCK_INSURANCES: Insurance[] = [
  {
    id: 1,
    company: '삼성화재',
    name: '무배당 삼성화재 다이렉트 실손의료비보험(2601.6)',
    type: '개인',
    date: '가입연월 2025.04',
    logo: 'https://placeholder.com/40',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const InsuranceListModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate(); // navigate 함수 선언
  const [selectedId, setSelectedId] = useState<number | null>(null); // 선택된 보험 ID 상태

  if (!isOpen) return null;

  // 선택하기 버튼 클릭 핸들러
  const handleSelect = () => {
    if (selectedId) {
      // 선택된 보험이 있을 때만 이동
      navigate('/medical-info'); // MedicalInfo.tsx가 연결된 경로로 설정
      onClose(); // 이동하면서 모달 닫기
    } else {
      alert('보험을 선택해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-[90%] max-w-[640px] p-10 relative shadow-xl">
        <button onClick={onClose} className="absolute top-8 right-8 hover:opacity-70 transition-opacity">
          <img src={close} alt="닫기" className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-scale-90 mb-8">원하는 보험을 선택해주세요.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_INSURANCES.map((ins) => (
            <div
              key={ins.id}
              onClick={() => setSelectedId(ins.id)} // 클릭 시 ID 저장
              className={`group border rounded-2xl p-6 cursor-pointer transition-all ${
                selectedId === ins.id
                  ? 'border-primary-50 bg-primary-5/10 ring-1 ring-primary-50' // 선택 시 스타일
                  : 'border-gray-scale-20 hover:border-primary-50 hover:bg-primary-5/10'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">로고</div>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    selectedId === ins.id ? 'bg-primary-50 text-white' : 'bg-primary-10 text-primary-50'
                  }`}
                >
                  {ins.type}
                </span>
              </div>
              <p className="text-xs text-gray-scale-50 mb-1">{ins.company}</p>
              <p className="text-sm font-bold text-gray-scale-80 leading-tight h-10 line-clamp-2">{ins.name}</p>
              <p className="text-[11px] text-gray-scale-40 mt-4">{ins.date}</p>
            </div>
          ))}

          <button className="border border-dashed border-gray-scale-30 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-gray-scale-5 transition-colors group cursor-pointer">
            <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
              +
            </div>
            <span className="text-sm font-medium text-gray-scale-50">새 보험 등록하기</span>
          </button>
        </div>

        {/* 하단 버튼: 선택 여부에 따라 배경색 변경 */}
        <button
          onClick={handleSelect}
          className={`w-full py-5 rounded-2xl mt-10 font-bold text-lg transition-colors cursor-pointer ${
            selectedId ? 'bg-primary-50 text-white' : 'bg-gray-scale-30 text-white pointer-events-none opacity-50'
          }`}
        >
          선택하기
        </button>
      </div>
    </div>
  );
};

export default InsuranceListModal;
