import { atom } from "jotai";
import { JSX } from "react";
import { atomWithStorage } from "jotai/utils";

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
  isLeftSide: boolean;
  isLeftTab: {
    communities: boolean;
  };
}
export const settingStore = atomWithStorage<SettingAtom>(
  "settingStoreKey",
  {
    location: "/",
    isLeftSide: true,
    isLeftTab: {
      communities: true,
    },
  }
);
