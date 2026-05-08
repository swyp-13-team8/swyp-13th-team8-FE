import { useState, useEffect, useCallback } from 'react';
import HistoryLayout from '../../histories/HistoryLayout';
import { getFavoriteCalculatorHistory, toggleFavoriteCalculatorHistory } from '../../../../../api/mypageApi';
import type { CalculatorHistoryItem } from '../../../../../type/historyTypes';

const COLUMNS = [
  { key: 'saved', label: '저장' },
  { key: 'calculatedDate', label: '계산일' },
  { key: 'productName', label: '보험 이름' },
  { key: 'medicalCost', label: '의료비' },
  { key: 'refundAmount', label: '예상 환급금' },
  { key: 'isSaved', label: '저장 여부' },
  { key: 'sort', label: '계산일 순', isSort: true },
];

const GRID_TEMPLATE = '60px 120px 1fr 140px 180px 100px 120px';

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return dateString.split('T')[0].replace(/-/g, '.');
};

const SavedHistoryCalculator = () => {
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFavoriteCalculatorHistory(currentPage);
      const rawList = data?.calculations ?? data ?? [];
      setItems(rawList);
      if (data?.pageInfo?.totalPages) setTotalPages(data.pageInfo.totalPages);
    } catch (e) {
      console.error('저장된 환급금 계산 히스토리 조회 실패', e);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleToggleSave = async (id: number) => {
    const strId = String(id);
    setItems((prev) => prev.map((item) => (item.calculationHistoryId === strId ? { ...item, isSaved: !item.isSaved } : item)));
    try {
      await toggleFavoriteCalculatorHistory(strId);
    } catch (e) {
      console.error('저장 토글 실패', e);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === strId ? { ...item, isSaved: !item.isSaved } : item)));
    }
  };

  return (
    <HistoryLayout
      columns={COLUMNS}
      gridTemplate={GRID_TEMPLATE}
      items={items}
      isLoading={isLoading}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onToggleSave={handleToggleSave}
      onDelete={() => {}}
      renderItem={(item: CalculatorHistoryItem) => (
        <>
          <span className="text-gray-scale-40 text-[14px]">{formatDate(item.calculatedDate)}</span>
          <div className="pr-10">
            <p className="text-gray-scale-90 text-[16px] font-bold truncate">{item.productName}</p>
            <p className="text-gray-scale-30 text-[12px] mt-1 font-medium">{item.companyName}</p>
          </div>
          <span className="text-gray-scale-90 font-medium text-[15px]">{item.medicalCost?.toLocaleString()}원</span>
          <div className="text-center">
            <p className="text-primary-50 text-[18px] font-bold">{item.refundAmount?.toLocaleString()}원</p>
            <p className="text-gray-scale-30 text-[12px] font-medium mt-0.5">/ 총 의료비 {item.medicalCost?.toLocaleString()}원</p>
          </div>
          <span className={`text-[14px] font-medium ${item.isSaved ? 'text-primary-50' : 'text-gray-scale-40'}`}>
            {item.isSaved ? '저장됨' : '미저장'}
          </span>
        </>
      )}
    />
  );
};

export default SavedHistoryCalculator;
