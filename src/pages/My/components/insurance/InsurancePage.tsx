import { useState } from 'react';
import CImg from '../../../../components/common/CImg';
import CLabel from '../../../../components/common/CLabel';
import CBreadcrumb from '../../../../components/common/CBreadcrumb';
import { right } from '../../../../assets/index';
import useInsurance from '../../../../hooks/useInsurance';
import InsuranceDetailModal from './InsuranceDetailModal';
import { useNavigate } from 'react-router';

const InsurancePage = () => {
  const navigate = useNavigate();
  const { insurances } = useInsurance();
  const [selectedInsurance, setSelectedInsurance] = useState<(typeof insurances)[0] | null>(null);

  return (
    <div>
      <CBreadcrumb items={[{ label: '마이페이지', path: '/mypage' }, { label: '내 보험 목록' }]} />
      <p className="text-title-h2 mt-10 mb-5">내 보험 목록</p>

      {insurances.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 gap-3">
          <div className="w-16 h-16 bg-gray-scale-10 rounded-xl" />
          <p className="text-body-m-r text-gray-scale-40">등록된 보험이 없습니다. 플러스 버튼을 눌러 등록을 시작해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {insurances.map((ins) => (
            <div
              key={ins.userInsuranceId}
              className="bg-primary-0 rounded-3xl border border-gray-scale-10 p-10 min-h-[250px] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 태그 + 화살표 */}
              <div className="flex items-center justify-between mb-10 ">
                <div className="flex gap-3 flex-wrap">
                  <CLabel variant="contract" size="sm">
                    {ins.contractType}
                  </CLabel>
                  <CLabel variant="generation" size="sm">
                    {ins.generation}세대
                  </CLabel>
                  <CLabel variant="coverage" size="sm">
                    {ins.coverageStructure}
                  </CLabel>
                  <CLabel variant="caution" size="sm">
                    {ins.cautionPoint}
                  </CLabel>
                </div>
                <button className="cursor-pointer shrink-0 ml-2" onClick={() => setSelectedInsurance(ins)}>
                  <CImg src={right} alt="상세보기" className="w-10 h-10 opacity-30" />
                </button>
              </div>

              {/* 로고 + 이름 */}
              <div className="flex items-center gap-3">
                <div className="w-[90px] h-[90px] bg-blue-500 rounded-full flex items-center justify-center shrink-0 mr-2">
                  <span className="text-white text-[10px] font-bold">{ins.companyName}</span>
                </div>
                <div>
                  <p className="text-title-h1 text-gray-scale-80 leading-snug">{ins.productName}</p>
                  <p className="text-body-xl-r text-gray-scale-40 mt-5">
                    {ins.companyName} · {ins.joinDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* + 버튼 */}
      <button
        onClick={() => navigate('/mypage/insurance/add')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary-50 text-white text-2xl flex items-center justify-center shadow-lg hover:bg-primary-60 transition-colors"
      >
        +
      </button>

      {/* 모달 */}
      {selectedInsurance && <InsuranceDetailModal userInsuranceId={selectedInsurance.userInsuranceId} onClose={() => setSelectedInsurance(null)} />}
    </div>
  );
};

export default InsurancePage;
