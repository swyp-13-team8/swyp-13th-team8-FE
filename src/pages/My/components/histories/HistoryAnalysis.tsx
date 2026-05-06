import { useState, useEffect, useCallback } from 'react';
import HistoryLayout from './HistoryLayout';
import CLabel from '../../../../components/common/CLabel';
import type { AnalysisHistoryItem } from '../../../../type/historyTypes';

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
  const [items, setItems] = useState<AnalysisHistoryItem[]>([]);

  // 1. 저장 토글 로직
  const handleToggleSave = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, isSaved: !item.isSaved } : item)));
  };

  // 2. 삭제 로직
  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const fetchHistory = useCallback(() => {
    const mockData: AnalysisHistoryItem[] = Array(5)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        analysisDate: '2026.04.15',
        insurer: '삼성화재',
        insurerLogo: '',
        contractType: '개인실손',
        policyName: '무배당 삼성화재 다이렉트 실손의료비보험(2601.6)',
        policyCode: 'ZPB292060_0_20260101_file1.pdf',
        labels: [
          { text: '4세대', variant: 'contract' as const },
          { text: '갱신형', variant: 'danger' as const },
        ],
        isSaved: i === 3,
      }));
    setItems(mockData);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <HistoryLayout
      columns={COLUMNS}
      gridTemplate={GRID_TEMPLATE}
      items={items}
      onToggleSave={handleToggleSave}
      onDelete={handleDelete}
      totalPages={5}
      currentPage={1}
      onPageChange={() => {}}
      renderItem={(item) => (
        /* 각 아이템의 본문 내용만 정의 (저장/삭제 제외) */
        <>
          <span className="text-gray-scale-40 text-[14px]">{item.analysisDate}</span>
          <div className="w-10 h-10 rounded-full bg-white border border-gray-scale-10 flex items-center justify-center overflow-hidden shadow-inner" />
          <div>
            <span className="bg-primary-5 text-primary-50 text-[13px] px-4 py-1.5 rounded-lg font-bold">{item.contractType}</span>
          </div>
          <div className="pr-10">
            <p className="text-gray-scale-90 text-[16px] font-bold truncate">{item.policyName}</p>
            <p className="text-gray-scale-30 text-[12px] mt-1 font-medium">{item.policyCode}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.labels.map((label, idx) => (
              <CLabel key={idx} variant={label.variant} size="sm">
                {label.text}
              </CLabel>
            ))}
          </div>
        </>
      )}
    />
  );
};

export default HistoryAnalysis;
