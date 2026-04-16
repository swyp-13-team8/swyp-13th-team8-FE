import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  /*
    defaultOptions : 프로젝트 내에 useQuery 에 기본값이 되는 옵션
    retry: 1 -> API 요청이 실패했을 떄 자동으로 다시 시도하는 횟수
    refetchOnWindowFocus: false -> 다른 탭을 보다가 다시 우리 서비스 탭으로 돌아왔을 때, 데이터를 자동으로 다시 불러올지 결정
  */
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        /* 사용법
          path: "주소"
          element: <컴포넌트 />
        */
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
