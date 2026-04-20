import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-scale-5">
      {/* 1. 조립된 헤더 컴포넌트 */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. 조립된 사이드바 컴포넌트 */}
        <Sidebar />

        {/* 3. 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto">
          <div className=" max-w-[1340px] mx-5 py-8 md:mx-[40px] xl:mx-[60px] 2xl:mx-[160px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
