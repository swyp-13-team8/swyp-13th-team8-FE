import CalculatorForm from './component/CalculatorForm';
import GuideBanner from './component/GuideBanner';
import HeroSection from './component/HeroSection';
import InfoCards from './component/InfoCards';

/**
 * 메인 페이지 레이아웃 및 배치 컴포넌트
 *
 */
const Home = () => {
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
