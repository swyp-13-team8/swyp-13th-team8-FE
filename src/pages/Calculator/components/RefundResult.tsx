import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CContents from '../../../components/common/CContents';
import CStepBar from '../../../components/common/CStepBar';
import CButton from '../../../components/common/CButton';
import { useCalcStore } from '../../../store/useCalcStore';
import { calculate, type calculateProps } from '../../../api/calculator';
import type { CalculatorResponse } from '../../../type/responseType';

const RefundResult = () => {
  const navigate = useNavigate();
  const steps = ['보험 불러오기', '진료 정보 입력', '계산 결과'];
  const currentStep = 2;
  const { calcForm, insuranceInfo } = useCalcStore();
  const request: calculateProps = { ...calcForm, insuranceId: String(insuranceInfo.id) };
  const [refundData, setRefundData] = useState<CalculatorResponse | null>(null);
  // 아코디언 상태 관리 (기본값: false - 접힘)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const resetStore = useCalcStore((state) => state.resetStore);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await calculate(request);
        setRefundData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    resetStore();
    fetchData();
  }, [resetStore]);
  return (
    <div className="pb-20">
      <CContents title="환급금 계산기">
        <div className="max-w-2xl mx-auto mb-12">
          <CStepBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[24px] font-bold mb-4">환급금 계산이 완료되었습니다!</h2>
          <div className="w-16 h-16 bg-gray-200 mx-auto mb-10 rounded-lg flex items-center justify-center text-2xl">✨</div>

          <div className="flex items-center justify-start gap-2 mb-4">
            <span className="font-bold text-lg text-gray-800">환급금 계산 결과</span>
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded font-bold">청구 권장 가능</span>
          </div>

          <div className="bg-gray-50 text-gray-400 text-[11px] p-4 rounded-xl text-left mb-8 leading-relaxed">
            본 계산 결과는 입력하신 정보를 바탕으로 AI가 산출한 참고용 결과입니다.
            <br />
            실제 금액은 가입자 개인의 조건에 따라 차이가 발생하거나 지급이 제한될 수 있습니다. 정확한 금액은 보험사를 통해 확인하시기 바랍니다.
          </div>

          {/* --- 계산 기준 요약 (아코디언 섹션) --- */}
          <section className="border border-gray-100 rounded-2xl text-left mb-12 shadow-sm overflow-hidden bg-white">
            {/* 클릭 가능한 헤더 */}
            <button
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            >
              <h3 className="font-bold text-gray-800">계산 기준 요약</h3>
              {/* 이미지 image_6580a6.png의 화살표 구현 */}
              <span className={`text-gray-400 transition-transform duration-300 ${isSummaryOpen ? 'rotate-180' : 'rotate-0'}`}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {/* 펼쳐지는 내용: isSummaryOpen이 true일 때만 렌더링 */}
            {isSummaryOpen && (
              <div className="px-6 pb-6 animate-fadeIn">
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                  {/* 적용 보험 */}
                  <div>
                    <p className="text-[11px] text-gray-400 mb-3">적용 보험</p>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] text-white font-bold leading-tight px-1 text-center">
                        {refundData?.companyName}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight text-gray-800">{refundData?.productName}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {refundData?.companyName} · {refundData?.joinDate} 가입
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {['개인실손', '4세대', '3대비급여', '갱신형'].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 진료 정보 */}
                  <div>
                    <p className="text-[11px] text-gray-400 mb-3">진료 정보</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {refundData?.treatmentInfos.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-1 rounded font-medium ${tag === '비급여' ? 'bg-pink-50 text-pink-500' : 'bg-purple-50 text-purple-500'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 leading-tight">ℹ️ {refundData?.basis}</p>
                  </div>
                </div>

                {/* 하단 요약 금액 정보 */}
                <div className="grid grid-cols-2 mt-6 pt-6 border-t border-gray-50">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">총 진료비</p>
                    <p className="font-bold text-gray-800">{refundData?.totalMedicalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">요양급여수가코드(EDI)</p>
                    <p className="font-bold text-gray-800">{refundData?.ediCode || '-'}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* --- 메인 결과 (차트 및 상세 계산) --- */}
          <div className="flex items-center justify-between gap-10 mb-16 px-4">
            {/* 왼쪽: 도넛 차트 */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-blue-50" />
              <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-t-transparent border-l-transparent rotate-[45deg]" />
              <div className="text-center z-10">
                <p className="text-[12px] text-gray-400 mb-1">예상 환급금</p>
                <p className="text-[32px] font-bold text-blue-600">{refundData?.refundAmount.toLocaleString()}</p>
                <p className="text-[11px] text-gray-300 mt-1">총 진료비 {refundData?.totalMedicalCost.toLocaleString()}원</p>
              </div>
              <div className="absolute top-0 bg-black text-white text-[10px] px-3 py-1 rounded-full font-medium">
                환급 대상 금액 {refundData?.refundRate}%
              </div>
            </div>

            {/* 오른쪽: 계산 상세 로직 */}
            <div className="flex-1 text-left">
              <h4 className="text-blue-600 font-bold text-sm mb-5">어떻게 계산 되었나요?</h4>
              <div className="space-y-4 border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">총 진료비</span>
                  <span className="font-bold text-gray-800">{refundData?.totalMedicalCost.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-1 font-medium">
                    <span className="bg-gray-400 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded">－</span> 적용 제외 금액
                  </span>
                  <span className="font-bold text-gray-800">
                    ({refundData?.deductibleRate}%) {refundData?.deductibleAmount.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-6 flex justify-between items-center">
                <span className="text-blue-600 text-[13px] font-bold">공제 기준</span>
                <span className="text-right text-blue-600 text-[12px] font-bold leading-tight">{refundData?.deductibleBasis}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">환급 대상 금액</span>
                  <span className="font-bold text-gray-800 text-xl">{refundData?.refundAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">자기부담금</span>
                  <span className="text-blue-400">
                    ({refundData?.deductibleRate}%) {refundData?.deductibleAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 액션 버튼 */}
          <div className="flex gap-3">
            <CButton
              variant="secondary"
              className="flex-1 py-4 border-gray-200 text-gray-600 font-bold"
              onClick={() => navigate('/calculator/medical-info')}
            >
              ↺ 다른 조건으로 계산하기
            </CButton>
            <CButton onClick={() => navigate('/mypage')} variant="primary" className="flex-[1.5] py-4 bg-primary-50 text-white font-bold">
              마이페이지로 이동
            </CButton>
          </div>
        </div>
      </CContents>
    </div>
  );
};

export default RefundResult;
