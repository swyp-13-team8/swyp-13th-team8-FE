import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getInsuranceDetail } from '../../../../api/Insurance';
import type { InsuranceDetailResponse } from '../../../../type/responseType';
import CLabel from '../../../../components/common/CLabel';

interface Props {
  userInsuranceId: number;
  onClose: () => void;
}

const InsuranceDetailModal = ({ userInsuranceId, onClose }: Props) => {
  const navigate = useNavigate();
  const [insuranceDetail, setInsuranceDetail] = useState<InsuranceDetailResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInsuranceDetail(userInsuranceId);
        setInsuranceDetail(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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
            <CLabel className="text-[11px] px-2 py-0.5 rounded-full" variant="contract">
              {insuranceDetail?.contractType}
            </CLabel>
            <CLabel className="text-[11px] px-2 py-0.5 rounded-full" variant="generation">
              {insuranceDetail?.generation}
            </CLabel>
            <CLabel className="text-[11px] px-2 py-0.5 rounded-full" variant="coverage">
              {insuranceDetail?.coverageStructure}
            </CLabel>
            <CLabel className="text-[11px] px-2 py-0.5 rounded-full" variant="caution">
              {insuranceDetail?.cautionPoint}
            </CLabel>
          </div>

          {/* 보험사 로고 + 이름 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[55px] h-[55px] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">{insuranceDetail?.companyName}</span>
            </div>
            <div>
              <p className="text-title-h3 font-bold">{insuranceDetail?.productName}</p>
              <p className="text-body-s-r text-gray-scale-40 mt-1">
                {insuranceDetail?.companyName} · {insuranceDetail?.joinDate}
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
          <p className="text-body-m-m font-bold text-gray-scale-80 mb-3"></p>

          <div className="flex flex-col gap-2 mb-4">
            {/* 1. 타이틀 영역 (파란색 세로 바 + 텍스트) */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <h3 className="text-lg font-bold text-blue-500">AI 핵심요약</h3>
            </div>

            {/* 2. 요약 내용 박스 */}
            <div className="p-6 bg-white border border-gray-200 rounded-[24px]">
              {/* 데이터가 있을 때 배열을 순회하며 리스트로 출력 */}
              {insuranceDetail?.coreSummary && insuranceDetail?.coreSummary.length > 0 ? (
                <ul className="pl-5 space-y-3 text-gray-700 list-disc marker:text-gray-400 leading-relaxed">
                  {insuranceDetail?.coreSummary.map((text, index) => (
                    <li key={index} className="pl-1">
                      {text}
                    </li>
                  ))}
                </ul>
              ) : (
                // {/* 데이터가 null이거나 비어있을 때 (분석 전 상태) */}
                <div className="flex items-center justify-center py-6 text-gray-400">AI 분석 요약이 아직 준비되지 않았습니다.</div>
              )}
            </div>
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
