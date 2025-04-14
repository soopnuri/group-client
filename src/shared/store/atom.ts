import { atom } from "jotai";
import { JSX } from "react";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const modalStore = atom<{
  key?: string;
  isOpen: boolean;
  content: JSX.Element | null;
}>({
  key: "modal",
  isOpen: false,
  content: null,
});

interface SettingAtom {
  location: string;
  communityId: number | null;
  isLeftSide: boolean;
  isLeftTab: {
    communities: boolean;
  };
}
export const settingStore = atomWithStorage<SettingAtom>("settingStoreKey", {
  location: "/",
  communityId: null,
  isLeftSide: true,
  isLeftTab: {
    communities: true,
  },
});

export const storage = createJSONStorage<UserAtom>(() =>
  typeof window !== "undefined" ? (window.sessionStorage as any) : undefined
);

interface UserAtom {
  id: number | null;
  name: string;
  email: string;
  image?: string;
}
export const DEFAULT_USER = {
  id: null,
  name: "",
  email: "",
  image: undefined,
};
export const userStore = atomWithStorage<UserAtom>(
  "user",
  DEFAULT_USER as UserAtom,
  storage
);
