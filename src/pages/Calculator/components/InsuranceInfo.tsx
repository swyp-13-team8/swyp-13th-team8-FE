import { useState, useEffect } from 'react';
import CButton from '../../../components/common/CButton';
import CContents from '../../../components/common/CContents';
import CLabel from '../../../components/common/CLabel';
import InsuranceListModal from './InsuranceListModal';
import type { Insurance } from './insuranceTypes';
import type { CalculatorHistoryItem } from '../../../type/historyTypes';
import { getCalculatorHistory, toggleFavoriteCalculatorHistory, deleteCalculatorHistory } from '../../../api/mypageApi';

const formatJoinDate = (joinDate: string, generation: string): string => {
  const [year, month] = joinDate.split('-');
  return `${year}.${month} 가입 (${generation}세대)`;
};

interface Props {
  onSelect: (insurance: Insurance) => void;
}

const InsuranceInfo = ({ onSelect }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await getCalculatorHistory(0, 5);
        setItems(res.content ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleToggleSave = async (calculationHistoryId: string) => {
    try {
      await toggleFavoriteCalculatorHistory(calculationHistoryId);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === calculationHistoryId ? { ...item, isSaved: !item.isSaved } : item)));
    } catch (e) {
      console.error('즐겨찾기 토글 실패', e);
    }
  };

  const handleDelete = async (calculationHistoryId: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await deleteCalculatorHistory(calculationHistoryId);
      setItems((prev) => prev.filter((item) => item.calculationHistoryId !== calculationHistoryId));
    } catch (e) {
      console.error('히스토리 삭제 실패', e);
    }
  };

  const handleSelect = (ins: Insurance) => {
    setIsModalOpen(false);
    onSelect(ins);
  };

  return (
    <div>
      <CContents title="환급금 계산기" className="!bg-transparent !border-none">
        <div className="h-90 bg-primary-10 rounded-2xl mx-5 -mt-2 flex items-center justify-center text-center border border-primary-30">
          <div className="flex flex-col items-center">
            <div className="mb-3 w-[100px] h-[100px] bg-gray-scale-10"></div>
            <p className="text-title-h3 leading-relaxed mb-2 tracking-tight">계산에 적용할 보험을 선택해주세요.</p>
            <p className="text-gray-scale-50 text-body-m-m mb-2">선택한 보험의 약관을 기준으로 환급금을 계산 할 수 있어요.</p>
            <CButton onClick={() => setIsModalOpen(true)} className="w-[200px] h-12 mt-4 text-sm !rounded-xl flex" variant="primary">
              내 보험에서 불러오기
            </CButton>
          </div>
        </div>

        <div className="mt-25">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-title-h2 text-gray-scale-80">분석 히스토리</span>
              <span className="text-[12px] text-gray-scale-40">최대 n개까지 기록되며, 초과될 경우 오래된 순부터 삭제됩니다.</span>
            </div>
            <button className="text-[13px] text-gray-scale-50 flex items-center gap-1 hover:text-primary-50">전체보기 {'>'}</button>
          </div>

          <div className="bg-primary-0 border border-gray-scale-40 rounded-3xl p-7 mx-5 mt-10 max-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="w-8 h-8 border-[3px] border-primary-10 border-t-primary-50 rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-gray-scale-40 text-sm">계산 히스토리가 없습니다.</div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.calculationHistoryId} className="flex items-center gap-5 px-5 py-4 bg-white border border-gray-scale-40 rounded-3xl">
                    {/* 북마크 버튼 */}
                    <button onClick={() => handleToggleSave(item.calculationHistoryId)} className="shrink-0 w-6 flex items-center justify-center">
                      <svg width="16" height="20" viewBox="0 0 16 20" fill={item.isSaved ? '#F5C518' : 'none'} xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 2C1 1.44772 1.44772 1 2 1H14C14.5523 1 15 1.44772 15 2V18.382C15 18.7607 14.5724 18.9837 14.2764 18.7764L8 14.5616L1.7236 18.7764C1.42757 18.9837 1 18.7607 1 18.382V2Z"
                          stroke={item.isSaved ? '#F5C518' : '#CCCCCC'}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>

                    {/* 계산 날짜 */}
                    <span className="text-gray-scale-40 text-[13px] w-[75px] shrink-0">{item.calculatedDate}</span>

                    {/* 라벨 */}
                    <div className="flex flex-col gap-1 shrink-0 w-[80px]">
                      {item.generation && (
                        <CLabel variant="generation" size="sm">
                          {item.generation}세대
                        </CLabel>
                      )}
                    </div>

                    {/* EDI 코드 */}
                    <span className="text-gray-scale-60 text-[13px] w-[55px] shrink-0">{item.ediCode ?? '-'}</span>

                    {/* 상품명 / 보험사·가입일 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-scale-80 text-[14px] font-bold leading-snug">{item.productName ?? '-'}</p>
                      <p className="text-gray-scale-30 text-[12px] mt-1">
                        {item.companyName}
                        {item.joinDate && item.generation ? ` · ${formatJoinDate(item.joinDate, item.generation)}` : ''}
                      </p>
                    </div>

                    {/* 환급 예상액 */}
                    <div className="text-right shrink-0">
                      <p className="text-primary-50 text-[16px] font-bold">{item.refundAmount?.toLocaleString()}원</p>
                      <p className="text-gray-scale-30 text-[11px] mt-0.5">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</p>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleDelete(item.calculationHistoryId)}
                      className="text-gray-scale-30 hover:text-gray-scale-60 shrink-0 text-base ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CContents>

      <InsuranceListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSelect} />
    </div>
  );
};

export default InsuranceInfo;
