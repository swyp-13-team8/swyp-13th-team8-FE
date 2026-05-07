import { useState, useEffect, useCallback } from 'react';
import HistoryLayout from './HistoryLayout';
import CLabel from '../../../../components/common/CLabel';
import type { CalculatorHistoryItem } from '../../../../type/historyTypes';
import { useAuthStore } from '../../../../store/useAuthStore';
import { getCalculatorHistory, toggleFavoriteCalculatorHistory, deleteCalculatorHistory } from '../../../../api/mypageApi';

const COLUMNS = [
  { key: 'saved', label: '저장' },
  { key: 'calculatedDate', label: '계산일' },
  { key: 'basis', label: '계산 항목' },
  { key: 'ediCode', label: '요양급여수가코드' },
  { key: 'policyName', label: '대상 보험' },
  { key: 'refundAmount', label: '예상 환급금' },
  { key: 'sort', label: '계산일 순', isSort: true },
];

const GRID_TEMPLATE = '60px 100px 180px 150px 1fr 180px 120px';

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return dateString.split('T')[0].replace(/-/g, '.');
};

const HistoryCalculator = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [items, setItems] = useState<CalculatorHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCalculatorHistory(currentPage);
      const rawList = data?.calculations ?? data ?? [];
      setItems(rawList);
      if (data?.pageInfo?.totalPages) setTotalPages(data.pageInfo.totalPages);
    } catch (error) {
      console.error('히스토리 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLogin) {
      fetchHistory();
    }
  }, []);

  const handleToggleSave = async (id: number) => {
    const strId = String(id);
    setItems((prev) => prev.map((item) => (item.calculationHistoryId === strId ? { ...item, isSaved: !item.isSaved } : item)));
    try {
      await toggleFavoriteCalculatorHistory(strId);
    } catch (error) {
      console.error('저장 토글 실패:', error);
      setItems((prev) => prev.map((item) => (item.calculationHistoryId === strId ? { ...item, isSaved: !item.isSaved } : item)));
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    const strId = String(id);
    try {
      await deleteCalculatorHistory(strId);
      setItems((prev) => prev.filter((item) => item.calculationHistoryId !== strId));
    } catch (error) {
      console.error('삭제 실패:', error);
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
      onDelete={handleDelete}
      renderItem={(item: CalculatorHistoryItem) => (
        <>
          <span className="text-gray-scale-40 text-[14px]">{formatDate(item.calculatedDate)}</span>

          <div className="flex flex-wrap gap-1">
            {item.basis?.map((b, i) => (
              <CLabel key={i} variant="contract" size="sm">
                {b}
              </CLabel>
            ))}
          </div>

          <span className="text-gray-scale-90 font-medium text-[15px]">{item.ediCode ?? '-'}</span>

          <div className="pr-4">
            <p className="text-gray-scale-90 text-[15px] font-bold leading-tight truncate">{item.productName ?? '-'}</p>
            <p className="text-gray-scale-30 text-[12px] mt-1 font-medium">
              {item.companyName} {item.joinDate ? `· ${item.joinDate}` : ''}
            </p>
          </div>

          <div className="text-center pr-11">
            <p className="text-primary-50 text-[18px] font-bold">{item.refundAmount?.toLocaleString()}원</p>
            <p className="text-gray-scale-30 text-[12px] font-medium mt-0.5">/ 총 진료비 {item.medicalCost?.toLocaleString()}원</p>
          </div>
        </>
      )}
    />
  );
};

export default HistoryCalculator;
