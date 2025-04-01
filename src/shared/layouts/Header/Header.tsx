"use client";
import Image from "next/image";
import * as styles from "./styles.css";
import Login from "@/shared/components/Login/Login";
import { useModal } from "@/shared/hooks/useModal";
import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import useOnClickOutside from "@/shared/hooks/useOnClickOutside";
///
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  const { setModalAtom } = useModal();
  const { data: session, status } = useSession();

  const [isOpenSet, isSetOpenSet] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef as React.RefObject<HTMLElement>, () =>
    isSetOpenSet(false)
  );

  return (
    <header className={styles.container}>
      <Image
        className={styles.image}
        src="group.png"
        width={40}
        height={40}
        alt="로고"
      />
      <article>검색</article>
      <section ref={profileMenuRef}>
        {status !== "loading" && session?.user ? (
          <>
            <div
              className={styles.profile}
              onClick={() => isSetOpenSet(!isOpenSet)}
            >
              <Image
                className={styles.image}
                width={36}
                height={36}
                src={session.user.image || "profile.png"}
                alt="프로필 이미지"
              />
            </div>
            {isOpenSet && <SetDisplay />}
          </>
        ) : (
          <>
            {!session?.user ? (
              <div
                onClick={() =>
                  setModalAtom({ isOpen: true, content: <Login /> })
                }
              >
                로그인
              </div>
            ) : (
              <Image
                className={styles.image}
                width={34}
                height={36}
                src={"profile.png"}
                alt="프로필 이미지"
              />
            )}
          </>
        )}
      </section>
    </header>
  );
};

export default Header;

const SetDisplay = () => {
  return (
    <section className={styles.setContainer}>
      <div className={styles.setItem}>
        <CgProfile size={20} />
        View Profile
      </div>
      <div className={styles.setItem} onClick={() => signOut()}>
        <IoExitOutline size={21} />
        Log Out
      </div>
      <div className={styles.setItem}>
        <IoSettingsOutline size={20} />
        Setting
      </div>
    </section>
  );
};
