import CBreadcrumb from '../../components/common/CBreadcrumb';
import CButton from '../../components/common/CButton';
import PdfViewer from './component/PdfViewer';
import { useRef, useState } from 'react';
import CLabel from '../../components/common/CLabel';

const CATEGORIES = ['전체', 'AI 핵심요약', '보장구조', '보장범위', '제한조건', '갱신·재가입', '청구방법', '해지·환급'];

const AnalysisResult = () => {
  // 💡 1. 현재 선택된 카테고리를 추적하는 상태 (버튼 색상 활성화용)
  const [activeCategory, setActiveCategory] = useState('전체');

  // 💡 2. 각 섹션의 DOM 요소(div)를 기억할 창고(Ref) 만들기
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null | undefined }>({});

  // 💡 3. 버튼 클릭 시 해당 섹션으로 스크롤을 이동시키는 함수
  const scrollToSection = (category: string) => {
    setActiveCategory(category); // 버튼 활성화 상태 변경

    if (category === '전체') {
      // '전체'를 누르면 우측 패널의 맨 위(AI 핵심요약)로 이동하게 처리
      sectionRefs.current['AI 핵심요약']?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // 다른 카테고리를 누르면 해당 Ref 위치로 부드럽게 스크롤
    const targetElement = sectionRefs.current[category];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // 부드러운 애니메이션
        block: 'start', // 화면(스크롤 컨테이너)의 맨 위쪽에 맞춰서 정렬
      });
    }
  };
  return (
    <div className="flex flex-row w-full h-full overflow-hidden bg-gray-scale-5">
      <div className="flex flex-col w-[55%] xl:w-3/5 h-full">
        {/* 상단 타이틀 영역 */}
        <div className="flex flex-col gap-4 px-10 pb-8">
          <CBreadcrumb
            items={[
              { label: '약관 분석', path: '/analysis' },
              { label: '약관 분석 결과', path: '/analysis/result' },
            ]}
          />
          <p className="text-title-h2 font-bold text-gray-scale-90">약관 분석 결과</p>
        </div>
        <div className="flex flex-col flex-1 border-t border-gray-scale-30">
          <div className="bg-primary-0 px-10 py-4 border-b border-gray-scale-30">
            <p className="text-gray-scale-60 font-medium">ZPB292060_0_20260101_file1.pdf</p>
          </div>
          <div className="flex-1 bg-gray-scale-20 relative">
            <div className="absolute inset-0 overflow-hidden">
              <PdfViewer fileUrl={''} />
            </div>
          </div>
        </div>
      </div>
      {/* PDF 요약 */}
      <div className="flex flex-col w-[45%] xl:w-2/5 h-full bg-primary-0 rounded-tl-[40px] shadow-PDF border-l border-gray-scale-20 z-10 overflow-y-auto p-6 gap-7">
        {/* 버튼 */}
        <div className="flex flex-wrap gap-2 ">
          {CATEGORIES.map((category, index) => (
            <CButton
              key={index}
              onClick={() => scrollToSection(category)}
              className={`px-4 py-2 rounded-full text-body-m-m transition-colors cursor-pointer ${
                index === 0
                  ? 'bg-primary-50 text-white' // 활성화 상태 (전체)
                  : 'bg-gray-scale-10 text-gray-scale-50 hover:bg-gray-scale-20' // 비활성화 상태
              }`}
            >
              {category}
            </CButton>
          ))}
        </div>
        <div className="bg-gray-scale-5 text-gray-scale-50 rounded-3xl">
          <p className="px-6 py-5 text-body-m-r">
            본 분석 결과는 AI가 약관 내용을 기반으로 요약·해석한 정보입니다.
            <br />
            실제 보장 여부 및 조건은 가입자 개인의 조건에 따라 달라질 수 있으며, 일부 내용은 부정확하거나 누락될 수 있습니다. 자세한 내용은 약관
            원문을 확인해주세요.
          </p>
        </div>
        {/* 요약 카드 더미 */}
        <div className="flex flex-col gap-15">
          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div ref={(el) => (sectionRefs.current['AI 핵심요약'] = el)} className="scroll-mt-12 flex gap-3 border-b border-gray-scale-30 pb-4">
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">AI 핵심요약</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <div className="flex flex-col gap-5">
                <p className="text-title-h3">무배당 삼성화재 다이렉트 실손의료비보험(2601.6)</p>
                <div className="flex gap-1.5">
                  <CLabel className="md:px-3 md:py-1 flex text-[12px]" children="개인실손" variant="contract" />
                  <CLabel className="md:px-3 md:py-1 flex text-[12px]" children="4세대" variant="generation" />
                  <CLabel className="md:px-3 md:py-1 flex text-[12px]" children="급여 + 비급여" variant="coverage" />
                  <CLabel className="md:px-3 md:py-1 flex text-[12px]" children="자기부담높음" variant="caution" />
                </div>
              </div>
              <div className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70">
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div className="flex gap-3 border-b border-gray-scale-30 pb-4">
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">보장 구조</p>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">기본 보장</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <div className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70">
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">추가 보장</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <div className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70">
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-gray-scale-5 rounded-2xl p-6">
              <div className="flex">
                <p className="text-title-h3">보장되지 않는 항목</p>
                <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
              </div>
              <div className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70">
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 border border-gray-scale-20 bg-gray-scale-0 rounded-2xl px-6 py-7">
            <div className="flex gap-3 border-b border-gray-scale-30 pb-4">
              <span className="border-4 border-primary-40 text-center"></span>
              <p className="text-primary-40 text-title-h4">보장 범위</p>
              <div className="ml-auto rounded-full bg-primary-30 w-7 h-7 justify-self-end"></div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              <div className="flex flex-col gap-1 px-6 text-body-m-r text-gray-scale-70">
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
                <li>급여()중심</li>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default AnalysisResult;
