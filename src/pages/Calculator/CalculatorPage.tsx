import { useEffect } from 'react';
import CBreadcrumb from '../../components/common/CBreadcrumb';
import InsuranceInfo from './components/InsuranceInfo';
import { useCalcStore } from '../../store/useCalcStore';

const Calculator = () => {
  const resetStore = useCalcStore((state) => state.resetStore);
  useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);
  return (
    <div>
      <CBreadcrumb items={[{ label: '환급금 계산기' }]} />
      <InsuranceInfo />
    </div>
  );
};

export default Calculator;
