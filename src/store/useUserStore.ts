import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  userInfo: { userId: string; name: string; email: string; profileImageUrl: string };
  setUserInfo: (info: { userId: string; name: string; email: string; profileImageUrl: string }) => void;
}

// 유저의 상태를 저장하는 코드
export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  userInfo: { userId: '', name: '', email: '', profileImageUrl: '' },
  setUserInfo: (info) =>
    set({
      isLoggedIn: !!info,
      userInfo: info,
    }),
}));
