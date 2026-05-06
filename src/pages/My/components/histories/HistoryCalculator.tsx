import { useState, useEffect, useCallback } from 'react';
import HistoryLayout from './HistoryLayout';
import CLabel from '../../../../components/common/CLabel';
import type { CalculatorHistoryItem } from '../../../../type/historyTypes';

const COLUMNS = [
  { key: 'saved', label: '저장' },
  { key: 'savedAt', label: '계산일' },
  { key: 'calculationItem', label: '계산 항목' },
  { key: 'coverageCode', label: '요양급여수가코드' },
  { key: 'policyName', label: '대상 보험' },
  { key: 'expectedRefund', label: '예상 환급금' },
  { key: 'sort', label: '분석일 순', isSort: true },
];

// 레이아웃과 일치하는 그리드 비율 설정
const GRID_TEMPLATE = '60px 100px 180px 150px 1fr 180px 120px';

const HistoryCalculator = () => {
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock 데이터 호출 (실제 연동 시 API 호출로 대체)
      const mockData: CalculatorHistoryItem[] = [
        {
          id: 1,
          savedAt: '2026.04.15',
          calculationItem: '도수치료',
          calculationCode: 'LA221',
          coverageCode: 'LA221',
          policyName: '무배당 삼성화재 다이렉트 실손의료비보험(2601.6)',
          policyCode: '',
          insurer: '삼성화재',
          joinDate: '2025.04 가입 (4세대)',
          expectedRefund: 12884000,
          totalMedicalCost: 30120000,
          isSaved: false,
        },
      ];

      // 실제 환경에서는 API 응답 시간을 고려해 지연 테스트를 해볼 수 있습니다.
      setItems(mockData);
      setTotalPages(2);
    } catch (error) {
      console.error('히스토리 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // 저장 토글 핸들러
  const handleToggleSave = async (id: number) => {
    try {
      // 낙관적 업데이트: UI를 먼저 변경
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, isSaved: !item.isSaved } : item)));
      // await toggleSaveHistory(id); // API 연동 시 주석 해제
    } catch (error) {
      console.error('저장 실패:', error);
      // 실패 시 원래대로 되돌리는 로직을 추가할 수 있습니다.
    }
  };

  // 삭제 핸들러
  const handleDelete = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      // await deleteHistory(id); // API 연동 시 주석 해제
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <HistoryLayout
      columns={COLUMNS}
      gridTemplate={GRID_TEMPLATE}
      items={items}
      isLoading={isLoading} // 로딩 상태 전달 (매우 중요!)
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onToggleSave={handleToggleSave}
      onDelete={handleDelete}
      renderItem={(item: CalculatorHistoryItem) => (
        <>
          {/* 1. 계산일 */}
          <span className="text-gray-scale-40 text-[14px]">{item.savedAt}</span>

          {/* 2. 계산 항목 태그 */}
          <div className="flex flex-wrap gap-1">
            <CLabel variant="contract" size="sm">
              {item.calculationItem}
            </CLabel>
          </div>

          {/* 3. 요양급여수가코드 */}
          <span className="text-gray-scale-90 font-medium text-[15px]">{item.coverageCode}</span>

          {/* 4. 대상 보험 정보 */}
          <div className="pr-4">
            <p className="text-gray-scale-90 text-[15px] font-bold leading-tight truncate">{item.policyName}</p>
            <p className="text-gray-scale-30 text-[12px] mt-1 font-medium">
              {item.insurer} - {item.joinDate}
            </p>
          </div>

          {/* 5. 예상 환급금 (우측 정렬 강조) */}
          <div className="text-center pr-11">
            <p className="text-primary-50 text-[18px] font-bold">{item.expectedRefund?.toLocaleString()}원</p>
            {item.totalMedicalCost && (
              <p className="text-gray-scale-30 text-[12px] font-medium mt-0.5">/ 총 진료비 {item.totalMedicalCost?.toLocaleString()}원</p>
            )}
          </div>
        </>
      )}
    />
  );
};

export default HistoryCalculator;
