import { useEffect, useState } from 'react';
import { deleteHistory, getHistories, toggleFavorite } from '../../../api/analysisApi';
import type { HistoryResponse } from '../../../type/responseType';
import CButton from '../../../components/common/CButton';

const HistoryAnalysis = () => {
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await getHistories();
        setHistory(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistories();

    console.log(history);
  }, []);

  const testDelete = async (id: number) => {
    await deleteHistory(id);
  };
  const testFavorite = async (id: number) => {
    await toggleFavorite(id);
  };

  return (
    <div>
      {history.map((items) => (
        <div>
          <CButton onClick={() => testDelete(items.analysisHistoryId)} children="삭제" />
          <CButton onClick={() => testFavorite(items.analysisHistoryId)} children="토글" />
        </div>
      ))}
    </div>
  );
};

export default HistoryAnalysis;
