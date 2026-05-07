import { useState, useEffect, useCallback } from 'react';
import HistoryLayout from './HistoryLayout';
import CLabel from '../../../../components/common/CLabel';
import type { AnalysisHistoryItem } from '../../../../type/historyTypes';
import { useAuthStore } from '../../../../store/useAuthStore';
import { getAnalysisHistory, toggleSaveAnalysisHistory, deleteAnalysisHistory } from '../../../../api/mypageApi';

const COLUMNS = [
  { key: 'saved', label: '저장' },
  { key: 'analysisDate', label: '분석일' },
  { key: 'insurer', label: '보험사' },
  { key: 'contractType', label: '가입 형태' },
  { key: 'policyName', label: '약관 이름' },
  { key: 'labels', label: '개요' },
  { key: 'sort', label: '분석일 순', isSort: true },
];

const GRID_TEMPLATE = '60px 120px 90px 120px 1fr 230px 50px';

const HistoryAnalysis = () => {
  const isLogin = !!useAuthStore((state) => state.accessToken);
  const [items, setItems] = useState<AnalysisHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleSave = async (id: number) => {
    await toggleSaveAnalysisHistory(id);
    setItems((prev) => prev.map((item) => (item.analysisHistoryId === id ? { ...item, isFavorite: !item.isFavorite } : item)));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteAnalysisHistory(id);
      setItems((prev) => prev.filter((item) => item.analysisHistoryId !== id));
    }
  };

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getAnalysisHistory(currentPage);
      setItems(data);
    } catch (e) {
      console.error('약관 분석 히스토리 조회 실패', e);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLogin) {
      fetchHistory();
    }
  }, []);

  return (
    <HistoryLayout
      columns={COLUMNS}
      gridTemplate={GRID_TEMPLATE}
      items={items}
      onToggleSave={handleToggleSave}
      onDelete={handleDelete}
      totalPages={5}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      renderItem={(item) => (
        <>
          <span className="text-gray-scale-40 text-[14px]">{item.createdAt}</span>
          <div className="w-10 h-10 rounded-full bg-white border border-gray-scale-10 flex items-center justify-center overflow-hidden shadow-inner">
            <span className="text-[11px] text-gray-scale-60 font-bold">{item.companyName}</span>
          </div>
          <div>
            <span className="bg-primary-5 text-primary-50 text-[13px] px-4 py-1.5 rounded-lg font-bold">{item.contractType}</span>
          </div>
          <div className="pr-10">
            <p className="text-gray-scale-90 text-[16px] font-bold truncate">{item.productName}</p>
            <p className="text-gray-scale-30 text-[12px] mt-1 font-medium">{item.generation}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CLabel variant="contract" size="sm">
              {item.coverageStructure}
            </CLabel>
            <CLabel variant="caution" size="sm">
              {item.cautionPoint}
            </CLabel>
          </div>
        </>
      )}
    />
  );
};

export default HistoryAnalysis;
