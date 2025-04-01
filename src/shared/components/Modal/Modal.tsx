"use client";
import { useModal } from "@/shared/hooks/useModal";
import * as styles from "./styles.css";

const Modal = () => {
  const { modalAtom } = useModal();
  return (
    modalAtom.isOpen && (
      <section className={styles.backdrop}>
        <div className={styles.wrap}>
          <div className={styles.modal}>{modalAtom.content}</div>
        </div>
      </section>
    )
  );
};
export default Modal;
