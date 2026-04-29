import CButton from '../../components/common/CButton';
import CImg from '../../components/common/CImg';
import Header from '../../components/layout/Header';

/* 랜딩 페이지 */
const LandingPage = () => {
  return (
    <div className="flex relative overflow-auto flex-col bg-gray-scale-">
      <Header />

      {/* 1. 첫 섹션 */}
      <section className="relative w-full max-w-7xl h-137 mx-auto mb-200 bg-linear-to-b from-[#D9D9D9] to-[#FFFFFF] rounded-t-[40px]">
        <div></div>

        {/* 오른쪽 아래 배너 */}
        <div className="absolute right-0 top-100 w-full max-w-195 h-138.75 rounded-[40px] bg-primary-0 border border-gray-scale-10"></div>
      </section>

      <span className="left-1/2 top-280 absolute h-53.25 border border-gray-scale-10"></span>

      {/* 2. 이런 생각  */}
      <section className="w-full pb-20">
        <div className="w-full max-w-7xl flex flex-col mx-auto items-center gap-20">
          <h2 className="text-title-h2">이런 생각, 해보신 적 있으신가요?</h2>
          <div className="w-full flex justify-center gap-16">
            {[1, 2, 3].map((items) => (
              <div className="flex flex-col gap-6 border border-primary-30 p-6 w-full max-w-82.5 rounded-2xl h-full max-h-87.5">
                <p className="text-gray-scale-60">Lorem ipsum dolor sit amet consectetur.</p>
                <div className="rounded-full max-w-47 max-h-47 w-47 h-47 bg-gray-scale-70 self-end">
                  <CImg className="w-full h-full rounded-full" src={''} alt="사진" />
                </div>
              </div>
            ))}
          </div>
          <p className="inline-block max-w-163 w-full text-body-r-m text-gray-scale-50 text-center">
            Lorem ipsum dolor sit amet consectetur. Donec eget lorem ornare proin vestibulum gravida eget commodo nam. Tristique varius sit tempus
          </p>
        </div>
      </section>

      {/* 3. 솔루션 설명 부분 */}
      <section className="w-full bg-gray-scale-80 h-256">
        <div className="w-full p-30 flex flex-col">
          <div className="w-120.5 h-120.5 rounded-full bg-gray-scale-40 self-end">
            <CImg className="rounded-full h-full" src="" alt="캐릭터 활용" />
          </div>
        </div>
      </section>
      {/* 4. 솔루션 요약 */}
      <section className="w-full bg-gray-scale-40 h-150 items-center">솔루션요약</section>

      {/* 5-1. 실손핏 기능 가이드 */}
      <section className="w-full h-307 bg-primary-10 px-30 pt-40">
        <div className="max-w-7xl w-full flex flex-col mx-auto gap-20">
          <h2 className="text-title-h2 self-center pb-37.75">실손핏 기능 가이드</h2>
          <div className="w-full flex flex-col gap-6">
            <h1 className="pb-6">기능 설명</h1>
            <h2 className="text-title-h2">Lorem ipsum dolor sit amet consectetur</h2>
            <p className="inline-block w-110 text-gray-scale-50">
              Lorem ipsum dolor sit amet consectetur. Donec eget lorem ornare proin vestibulum gravida eget
            </p>
          </div>
          <div className="relative w-212.5 h-138.75 bg-linear-to-b rounded-t-[40px] from-[#D9D9D9] to-[#FFFFFF] ">
            <div className="absolute top-1/5 -right-1/6 w-75.5 h-82.5 rounded-[40px] bg-primary-0"></div>
          </div>
        </div>
      </section>
      {/* 5-2. 기능 설명 */}
      <section className="w-full h-256 bg-primary-10 pt-40">
        <div className="max-w-7xl w-full flex flex-col mx-auto gap-20 px-10">
          <div className="h-87.5 flex gap-30">
            <div className="w-135 h-full bg-gray-scale-60"></div>
            <div className="flex flex-col gap-6">
              <h1 className="pb-6">기능 설명</h1>
              <h2 className="text-title-h2">Lorem ipsum dolor sit amet consectetur</h2>
              <p className="inline-block w-110 text-gray-scale-50">
                Lorem ipsum dolor sit amet consectetur. Donec eget lorem ornare proin vestibulum gravida eget
              </p>
            </div>
          </div>
          <div className="h-87.5 flex gap-30 justify-end">
            <div className="flex flex-col gap-6">
              <h1 className="pb-6">기능 설명</h1>
              <h2 className="text-title-h2">Lorem ipsum dolor sit amet consectetur</h2>
              <p className="inline-block w-110 text-gray-scale-50">
                Lorem ipsum dolor sit amet consectetur. Donec eget lorem ornare proin vestibulum gravida eget
              </p>
            </div>
            <div className="w-135 h-full bg-gray-scale-60"></div>
          </div>
        </div>
      </section>
      {/* 6. 결론 */}
      <section className="w-full h-200">
        <div className="max-w-7xl x-full h-full mx-auto flex pb-30 items-center justify-center">
          <CButton className="bg-black text-white md:rounded-sm px-24 py-4 self-end" children="지금 시작하기" />
        </div>
      </section>

      {/* 7. 푸터 */}
      <section className="w-full px-10 py-20 bg-gray-scale-70">
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-30">
          <div className="w-75.5 h-17.25 bg-gray-scale-40"></div>
          <div className="flex flex-row justify-between">
            <p className="text-gray-scale-50">이용약관 | 개인정보처리방침</p>
            <p className="text-gray-scale-50">ⓒ 2026 슬림핏. All Rights Reserved.</p>
            <p className="text-gray-scale-50">ⓒ 2026 슬림핏. All Rights Reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
