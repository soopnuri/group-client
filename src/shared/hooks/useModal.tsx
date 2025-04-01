"use client";
import { useAtom } from "jotai";
import { modalStore } from "@/shared/store/atom";
import { JSX } from "react";

interface ModalProps {
  title: string;
  content: JSX.Element;
}
export const useModal = () => {
  const [modalAtom, setModalAtom] = useAtom(modalStore);

  const close = () => {
    return setModalAtom((prev) => ({ ...prev, isOpen: false }));
  };

  const open = ({ title, content }: ModalProps) => {
    setModalAtom((prev) => ({ ...prev, title, content, isOpen: true }));
  };

  return {
    modalAtom,
    setModalAtom,
    close,
    open,
  };
};
