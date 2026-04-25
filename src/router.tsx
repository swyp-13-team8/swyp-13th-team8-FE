import { createBrowserRouter } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home/HomePage';
import Calculator from './pages/Calculator/CalculatorPage';
import Analysis from './pages/Analysis/AnalysisPage';
import MyPage from './pages/My/MyPage';
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
    // 홈 페이지
    path: '/home',
    element: <AppLayout />,
    children: [
      // 홈 페이지 컴포넌트
      { index: true, element: <Home /> },
    ],
  },
  {
    // 환급금 계산기 페이지
    path: '/calculator',
    element: <AppLayout />,
    children: [
      // 환급금 계산기 페이지
      { index: true, element: <Calculator /> },
    ],
  },
  {
    // 약관 분석 페이지
    path: '/analysis',
    element: <AppLayout />,
    children: [
      // 약관 분석 페이지 컴포넌트
      { index: true, element: <Analysis /> },
    ],
  },
  {
    // 마이페이지
    path: '/mypage',
    element: <AppLayout />,
    children: [
      // 마이페이지 컴포넌트
      { index: true, element: <MyPage /> },
    ],
  },
]);

export default router;
