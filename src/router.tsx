import { createBrowserRouter } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/home/Home';

/*
  라우터 주소 체계 설정하는 파일
*/
const router = createBrowserRouter([
  {
    // 랜딩 페이지
    path: '/',
    element: <></>,
  },
  {
    // 로그인 페이지
    path: '/login',
    element: <></>,
  },
  {
    // 메인 서비스 그룹
    path: '/home',
    element: <AppLayout />,
    children: [
      // 메인 페이지 컴포넌트
      { index: true, element: <Home /> },
      { path: '', element: <></> },
      /* 사용법
          path: "주소"
          element: <컴포넌트 />
      */
    ],
  },
]);

export default router;
