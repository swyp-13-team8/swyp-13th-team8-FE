import { useEffect } from 'react';
import { useCalcStore } from '../../store/useCalcStore.ts';
import CalculatorForm from './component/CalculatorForm.tsx';
import GuideBanner from './component/GuideBanner.tsx';
import HeroSection from './component/HeroSection.tsx';
import InfoCards from './component/InfoCards.tsx';

/**
 * 메인 페이지 레이아웃 및 배치 컴포넌트
 *
 */
const Home = () => {
  const resetStore = useCalcStore((state) => state.resetStore);
  useEffect(() => {
    // 홈 화면에서 다른 페이지로 넘어갈 때(언마운트 될 때) 딱 한 번 실행됩니다!
    return () => {
      resetStore(); // 전역 상태 초기화!
    };
  }, [resetStore]);
  return (
    <div className="flex flex-1 max-w-335 flex-col gap-5">
      {/* 상단 섹션 */}
      <div className="flex flex-row w-full gap-5">
        <HeroSection />
        <InfoCards />
      </div>
      {/* 하단 섹션 */}
      <div className="flex flex-row w-full gap-5">
        <GuideBanner />
        <CalculatorForm />
      </div>
    </div>
  );
};

export default Home;
