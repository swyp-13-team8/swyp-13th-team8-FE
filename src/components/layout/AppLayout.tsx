import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import GlobalModal from '../common/GlobalModal';

const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-scale-5">
      {/* 1. 조립된 헤더 컴포넌트 */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. 조립된 사이드바 컴포넌트 */}
        <Sidebar />

        {/* 3. 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto px-4 md:px-10 xl:px-15 2xl:px-40">
          <div className="mx-auto w-full max-w-335 py-10">
            <Outlet />
          </div>
        </main>
      </div>
      {/* 모달 렌더하는 공용 컴포넌트 */}
      <GlobalModal />
    </div>
  );
};

export default AppLayout;
