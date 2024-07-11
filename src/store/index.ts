import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserInfoState {
  userInfo: {
    name?: string;
  };
  routes: any[];
  setUserInfo: (by: any) => void;
  setRoutes: (data: any[]) => void;
  logout: () => void;
}

export const useUserInfo = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: {},
      routes: [],
      setUserInfo: (userInfo: any) => set({ userInfo }),
      setRoutes: (data: any[]) => {
        set({
          routes: data,
        });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ userInfo: {} });
      },
    }),
    {
      name: 'userInfo', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
