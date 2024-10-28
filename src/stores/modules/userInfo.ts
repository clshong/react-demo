import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfoStore {
  userInfo: Object;
  setToken: (token: string) => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      userInfo: { token: "" },
      setToken: (token: string) => set({ userInfo: { token } }),
    }),
    {
      name: "userInfo",
      partialize: (state) => ({ userInfo: state.userInfo }),
    },
  ),
);
