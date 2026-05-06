import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  insurance: {
    id: number;
    company: string;
    name: string;
    date: string;
    status: string;
  };
  onClose: () => void;
}

const ACCORDION_ITEMS = [
  {
    key: 'summary',
    title: 'AI 핵심요약',
    content: (
      <div className="space-y-1">
        <p>• 급여(건강보험 적용 항목) 중심</p>
        <p>• 비급여는 특약 가입 시 보장</p>
        <p>• 1년 갱신형</p>
      </div>
    ),
  },
  {
    key: 'structure',
    title: '보장 구조',
    content: (
      <div className="space-y-2">
        <p className="font-bold text-gray-scale-70">기본 보장</p>
        <p>급여 항목, 급여 본인부담분, 급여 식대</p>
        <p className="font-bold text-gray-scale-70 mt-2">추가 방법</p>
        <p>• 특약 가입 시 비급여항목 보장</p>
      </div>
    ),
  },
  {
    key: 'coverage',
    title: '보장 범위',
    content: (
      <div className="space-y-1">
        <p>• 입원 급여 시 90%까지 보장, 비급여는 약 70% 보장</p>
        <p>• 통원 치료 1~30회 급여 수 기준, 건당 10~30%의 급여비율 이 관례 해당</p>
      </div>
    ),
  },
  {
    key: 'limit',
    title: '제한 조건',
    content: (
      <div className="space-y-1">
        <p>• 정신 과목 진료 제한</p>
        <p>• 항목 정의에 맞지 않는 공제 시에는 진료 신에, 조산기념비, 주수 제한</p>
      </div>
    ),
  },
  {
    key: 'renewal',
    title: '등구 상법',
    content: (
      <div className="space-y-1">
        <p>• 세계급여의무에 의해서, 에이지서비스, 세동치서비스 주수유를 1년2개월 후에 후에 세부서비스들이 직접 줄수 가 연락 등록되어 나 지고</p>
        <p>• 등록 신청 없이 신청된 설계내실은 스스로</p>
      </div>
    ),
  },
  {
    key: 'resubscribe',
    title: '갱신 재가입',
    content: (
      <div className="space-y-1">
        <p>• 보 갱신기간</p>
        <p>• 세구 기간을 이내 분이라며, 세구서비스에 대해서에서 적립금이 적립 가능 없음</p>
        <p>• 갱신기간 기간이 이내에 세동비서비스가 실질 세부재등을 이내에 가담받은 가능하고, 주고</p>
      </div>
    ),
  },
  {
    key: 'refund',
    title: '의자 처리금',
    content: (
      <div className="space-y-1">
        <p>• 보상기간 순에 복귀된 세부 공제를 설계를 반환해야 대상</p>
        <p>• 납입 복귀 시 설계 시 등이 된 내용</p>
      </div>
    ),
  },
];

const InsuranceDetailModal = ({ insurance, onClose }: Props) => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleKey = (key: string) => {
    setOpenKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] w-[850px] max-h-[80vh] flex flex-col relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-scale-40 hover:text-gray-scale-80 text-xl z-10">
          ✕
        </button>

        {/* 스크롤 영역 */}
        <div className="overflow-y-auto px-8 pt-8 pb-4 flex-1">
          <p className="text-title-h3 font-bold text-center mb-6">보험 상세</p>

          {/* 태그들 */}
          <div className="flex gap-1 mb-4">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-scale-5 text-gray-scale-50 border border-gray-scale-20">개인실손</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-5 text-primary-50 border border-primary-20">4세대</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-scale-5 text-gray-scale-50 border border-gray-scale-20">도수치료</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 text-red-400 border border-red-100">갱신형</span>
          </div>

          {/* 보험사 로고 + 이름 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[55px] h-[55px] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">{insurance.company}</span>
            </div>
            <div>
              <p className="text-title-h3 font-bold">{insurance.name}</p>
              <p className="text-body-s-r text-gray-scale-40 mt-1">
                {insurance.company} · {insurance.date}
              </p>
            </div>
          </div>

          {/* 안내 박스 */}
          <div className="bg-gray-scale-5 rounded-xl p-4 mb-6 text-body-s-r text-gray-scale-50 leading-relaxed">
            본 분석 결과는 AI가 약관 내용을 기반으로 요약·해석한 정보입니다.
            <br />
            실제 보장 여부 및 조건은 가입한 계약의 조건과 다를 수 있으며, 상세 내용은 보험증서를 확인해주세요.
          </div>

          {/* 약관 내용 아코디언 */}
          <p className="text-body-m-m font-bold text-gray-scale-80 mb-3">약관 내용</p>

          <div className="flex flex-col gap-2 mb-4">
            {ACCORDION_ITEMS.map((item) => {
              const isOpen = openKeys.includes(item.key);
              return (
                <div key={item.key} className="w-full rounded-xl border border-gray-scale-10 overflow-hidden">
                  <button
                    onClick={() => toggleKey(item.key)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-scale-5 hover:bg-gray-scale-10 transition-colors"
                  >
                    <span className="text-body-m-m text-gray-scale-70">{item.title}</span>
                    <span className="text-gray-scale-40">{isOpen ? '∧' : '∨'}</span>
                  </button>
                  {isOpen && <div className="px-4 py-3 text-body-s-r text-gray-scale-60">{item.content}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="px-8 py-4 border-t border-gray-scale-5">
          <button
            onClick={() => {
              onClose();
              navigate('/calculator');
            }}
            className="w-full py-3 rounded-xl bg-primary-5 text-primary-50 font-bold text-body-m-m hover:bg-primary-10 transition-colors"
          >
            이 보험으로 환급금 계산하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetailModal;
