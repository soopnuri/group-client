"use client";
import Image from "next/image";
import * as styles from "./styles.css";
import Login from "@/shared/components/Login/Login";
import { useModal } from "@/shared/hooks/useModal";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "@/shared/hooks/useOnClickOutside";
///
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { DEFAULT_USER, userStore } from "@/shared/store/atom";
import { fetchGetUser, fetchLogout } from "@/apis/auth";

const Header = () => {
  const { setModalAtom } = useModal();
  const [userAtom, setUserAtom] = useAtom(userStore);

  const [isOpenSet, isSetOpenSet] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef as React.RefObject<HTMLElement>, () =>
    isSetOpenSet(false)
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetchGetUser();

      if (response?.success === true) {
        setUserAtom({ ...response.data });
      } else {
        setUserAtom((prev) => ({ ...prev, user: { id: null } }));
      }
    };

    if (userAtom.id === null) {
      fetchUserProfile();
    }
  }, []);

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
        {userAtom?.id ? (
          <>
            <div
              className={styles.profile}
              onClick={() => isSetOpenSet(!isOpenSet)}
            >
              <Image
                className={styles.image}
                width={36}
                height={36}
                src={userAtom.image || "profile.png"}
                alt="프로필 이미지"
              />
            </div>
            {isOpenSet && <SetDisplay />}
          </>
        ) : (
          <>
            {!userAtom?.id ? (
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
  const setUserAtom = useSetAtom(userStore);
  const handleLogout = async () => {
    const res = await fetchLogout();

    if (res.success) {
      window.location.reload();
    }
    setUserAtom(DEFAULT_USER);
  };

  return (
    <section className={styles.setContainer}>
      <div className={styles.setItem}>
        <CgProfile size={20} />
        View Profile
      </div>
      <div className={styles.setItem} onClick={handleLogout}>
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
