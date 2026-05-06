import { useState } from 'react';
// 1. react-router v7에서 useNavigate 임포트
import { useNavigate } from 'react-router';
import CContents from '../../../components/common/CContents';
import CStepBar from '../../../components/common/CStepBar';
import CButton from '../../../components/common/CButton';
import CBreadcrumb from '../../../components/common/CBreadcrumb';

const MedicalInfo = () => {
  // 2. 네비게이트 함수 선언
  const navigate = useNavigate();

  const steps = ['보험 불러오기', '진료 정보 입력', '계산 결과'];
  const currentStep = 1;

  const [hospitalType, setHospitalType] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [medicalItem, setMedicalItem] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');

  // 모든 필수 값이 채워졌는지 확인
  const isComplete = hospitalType && visitType && purpose && medicalItem && amount.trim().length > 0;

  // 3. 계산하기 버튼 클릭 시 호출될 핸들러
  const handleCalculate = () => {
    if (isComplete) {
      // 결과 페이지로 이동 (라우터 설정에 등록된 path로 이동)
      // 만약 결과 페이지 경로가 '/refund-result'라면 해당 경로로 수정하세요.
      navigate('/refund-result');
    }
  };

  const getSelectedClass = (current: string | null, target: string) => {
    return current === target
      ? 'border-primary-50 bg-primary-5 text-primary-50 font-bold'
      : 'border-gray-scale-10 text-gray-scale-40 hover:bg-gray-50';
  };

  return (
    <div className="pb-20">
      <CBreadcrumb items={[{ label: '환급금 계산기' }]} />

      <CContents title="환급금 계산기">
        <div className="max-w-2xl mx-auto mb-16">
          <CStepBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-[22px] font-bold text-center mb-12">진료 정보를 입력해 주세요.</h2>

          <div className="space-y-10">
            {/* 병원 유형 */}
            <section>
              <label className="block text-sm font-bold mb-3">
                병원 유형 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['의원 (동네 병원)', '일반 병원', '종합병원', '모르겠어요'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setHospitalType(type)}
                    className={`py-4 rounded-xl border text-[14px] transition-all ${getSelectedClass(hospitalType, type)}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </section>

            {/* 진료 유형 & 목적 */}
            <div className="grid grid-cols-2 gap-10">
              <section>
                <label className="block text-sm font-bold mb-3">
                  진료 유형 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['외래(통원)', '입원', '약제(처방)'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setVisitType(t)}
                      className={`flex-1 py-3 border rounded-xl text-sm transition-all ${getSelectedClass(visitType, t)}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="block text-sm font-bold mb-3">
                  진료 목적 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['치료 목적', '검사 목적', '모르겠어요'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPurpose(t)}
                      className={`flex-1 py-3 border rounded-xl text-sm transition-all ${getSelectedClass(purpose, t)}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* 진료 항목 아이콘 리스트 */}
            <section>
              <label className="block text-sm font-bold mb-5">
                진료 항목 <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between px-4">
                {['일반 진료', '물리치료', '도수치료', '체외충격파', '주사', 'MRI', 'CT'].map((item) => (
                  <div key={item} onClick={() => setMedicalItem(item)} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center ${
                        medicalItem === item
                          ? 'bg-primary-5 border-primary-50'
                          : 'bg-gray-scale-10 border-gray-scale-20 group-hover:border-primary-50'
                      }`}
                    />
                    <span className={`text-[12px] ${medicalItem === item ? 'text-primary-50 font-bold' : 'text-gray-scale-40'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 총 진료비 & 급여 여부 */}
            <div className="grid grid-cols-2 gap-10 items-end">
              <section>
                <label className="block text-sm font-bold mb-3">
                  총 진료비 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="120,000"
                    className="w-full p-4 bg-white border border-gray-scale-10 rounded-xl outline-none focus:border-primary-50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-scale-40">원</span>
                </div>
              </section>
              <section className="pb-4 flex gap-6">
                {['급여', '비급여', '모르겠어요'].map((label) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="pay" className="w-4 h-4 accent-primary-50" defaultChecked={label === '비급여'} />
                    <span className="text-sm text-gray-scale-60">{label === '급여' ? '급여 (건강보험 적용)' : label}</span>
                  </label>
                ))}
              </section>
            </div>

            {/* EDI 코드 입력 영역 */}
            <div className="bg-primary-5/30 border border-primary-10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-primary-50 text-sm font-bold">📌 더 정확한 결과를 원한다면</div>
              <div className="bg-white border border-gray-scale-5 rounded-xl p-5">
                <p className="text-xs font-bold text-gray-scale-80 mb-2">요양급여수가코드 (EDI)</p>
                <input type="text" placeholder="LA221" className="w-full p-3 border border-gray-scale-10 rounded-lg text-sm mb-3" />
                <p className="text-[11px] text-gray-scale-40 flex gap-1 items-start">
                  <span>ℹ️</span> 진료비 세부 내역서에 있는 요양급여수가코드(EDI)로 계산의 정확도를 높일 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <CButton
              variant={isComplete ? 'primary' : 'secondary'}
              size="lg"
              disabled={!isComplete}
              className={`w-full py-5 rounded-2xl font-bold transition-all duration-300 ${
                !isComplete ? 'opacity-50 grayscale cursor-not-allowed' : 'opacity-100'
              }`}
              // 4. 클릭 이벤트 연결
              onClick={handleCalculate}
            >
              계산하기
            </CButton>
          </div>
        </div>
      </CContents>
    </div>
  );
};

export default MedicalInfo;
