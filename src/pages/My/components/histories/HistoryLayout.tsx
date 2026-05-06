import React, { useState } from 'react';
import CImg from '../../../../components/common/CImg';
import { close, history, historyHover } from '../../../../assets/index';

// 1. 컬럼 타입 정의
interface Column {
  key: string;
  label: string;
  isSort?: boolean;
}

// 2. Props 인터페이스 수정 (이미지의 에러 해결 포인트)
interface HistoryLayoutProps {
  columns: Column[];
  gridTemplate: string;
  items: any[];
  isLoading?: boolean; // 로딩 상태 추가
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onToggleSave?: (id: number) => void; // 선택적 속성으로 정의
  onDelete?: (id: number) => void; // 선택적 속성으로 정의
  renderItem: (item: any) => React.ReactNode;
}

const HistoryLayout = ({
  columns = [],
  gridTemplate,
  items = [],
  isLoading = false,
  totalPages,
  currentPage,
  onPageChange,
  onToggleSave,
  onDelete,
  renderItem,
}: HistoryLayoutProps) => {
  return (
    <div className="w-full max-h-[800px] bg-white rounded-[40px] border border-gray-scale-10 mt-5 flex flex-col overflow-hidden shadow-sm">
      {/* 헤더 영역 */}
      <div
        className="grid px-12 py-5 items-center text-gray-scale-60 text-[14px] font-medium  shrink-0"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => (
          <div key={col.key} className={`flex items-center gap-1 ${col.key === 'policyName' || col.key === 'labels' ? 'justify-center' : ''}  `}>
            <span className="whitespace-nowrap">{col.label}</span>
            {col.isSort && (
              <button className="flex items-center ml-1 opacity-40 hover:opacity-100 transition-opacity">
                <span className="text-[10px]">▲▼</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 overflow-y-auto px-4 mt-2 pb-2 scrollbar-hide">
        <div className="flex flex-col gap-3">
          {isLoading ? (
            // 로딩 중일 때 표시
            <div className="py-20 text-center text-gray-scale-30 font-medium">내역을 불러오는 중입니다...</div>
          ) : items.length > 0 ? (
            // 데이터가 있을 때 표시
            items.map((item) => (
              <div
                key={item.id}
                className="grid w-full px-10 py-6 items-center bg-white border border-gray-scale-20 rounded-[20px] hover:border-primary-30 hover:bg-gray-scale-5 transition-all group shadow-sm"
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {/* [공통] 저장 버튼 */}
                <SaveButton isSaved={item.isSaved} onClick={() => onToggleSave?.(item.id)} />

                {/* [개별 콘텐츠] renderItem을 통해 주입받은 UI */}
                {renderItem(item)}

                {/* [공통] 삭제 버튼 */}
                <div className="flex justify-end">
                  <button onClick={() => onDelete?.(item.id)} className="p-2 hover:bg-gray-scale-10 rounded-full transition-colors">
                    <CImg src={close} alt="삭제" className="w-5 h-5 opacity-20 group-hover:opacity-40" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            // 데이터가 없을 때 표시
            <div className="py-20 text-center text-gray-scale-30 font-medium">내역이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 페이지네이션 영역 */}
      {totalPages > 0 && (
        <div className="py-6 border-t border-gray-scale-5 flex justify-center items-center gap-2 shrink-0">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-scale-40 text-sm disabled:opacity-20 mr-4 transition-opacity"
          >
            &lt; 이전
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-9 h-9 rounded-lg text-[15px] font-medium transition-all
                ${currentPage === i + 1 ? 'bg-primary-50 text-white shadow-md' : 'text-gray-scale-40 hover:bg-gray-scale-5'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-scale-40 text-sm disabled:opacity-20 ml-4 transition-opacity"
          >
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
};

// --- 저장 버튼 컴포넌트 (아이콘 호버 독립 관리) ---
const SaveButton = ({ isSaved, onClick }: { isSaved: boolean; onClick: () => void }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex justify-start w-fit" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <button onClick={onClick} className="active:scale-90 transition-transform focus:outline-none">
        <CImg src={isSaved || isHover ? historyHover : history} alt="저장" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HistoryLayout;
