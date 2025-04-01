"use client";
import { useEffect, useState } from "react";
import * as styles from "./styles.css";
// assets
import { FiChevronLeft } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { FiMap } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { FiPlus } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Communities, fetchGetCommunities } from "@/apis/community";
import { Divider } from "@/shared/components/Divider/Divider";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { settingStore } from "@/shared/store/atom";

const LeftSide = () => {
  const navigate = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery({
    queryKey: ["communities", session?.accessToken],
    queryFn: () => fetchGetCommunities(session?.accessToken),
    select: (data) => data.data,
  });

  const [settingAtom, setSettingAtom] = useAtom(settingStore);

  useEffect(() => {
    if (data) {
      queryClient.setQueryData(["communities"], data);
    }
  }, [isLoading, data]);
  if (isLoading) return <div>Loading...</div>;

  const handleLocation = (location: string) => {
    setSettingAtom((prev) => ({ ...prev, location: location }));
    navigate.push(`/${location}`);
  };

  return (
    <section
      className={`${styles.container} ${
        !settingAtom.isLeftSide && styles.closed
      }`}
    >
      <span
        className={styles.collpaseIcon}
        onClick={() =>
          setSettingAtom((prev) => ({ ...prev, isLeftSide: !prev.isLeftSide }))
        }
      >
        {settingAtom.isLeftSide ? <FiChevronLeft /> : <FiMenu />}
      </span>
      {settingAtom.isLeftSide && (
        <>
          <section>
            <div
              onClick={() => handleLocation("/")}
              className={`${styles.button} ${
                settingAtom.location === "/" && styles.active
              }`}
            >
              <FiHome
                className={settingAtom.location === "" ? styles.iconActive : ""}
              />
              메인
            </div>
            <div
              className={`${styles.button} ${
                settingAtom.location === "popular" && styles.active
              }`}
            >
              <FiBarChart
                className={
                  settingAtom.location === "popular" ? styles.iconActive : ""
                }
              />
              인기
            </div>
            <div
              className={`${styles.button} ${
                settingAtom.location === "all" && styles.active
              }`}
            >
              <FiMap
                className={
                  settingAtom.location === "all" ? styles.iconActive : ""
                }
              />
              커뮤니티
            </div>
          </section>
          <Divider />
          <section>
            <strong
              className={styles.subTitle}
              onClick={() =>
                setSettingAtom((prev) => ({
                  ...prev,
                  isLeftTab: {
                    ...prev.isLeftTab,
                    communities: !prev.isLeftTab.communities,
                  },
                }))
              }
            >
              Communities
              <FiChevronDown
                className={`${
                  settingAtom.isLeftTab.communities
                    ? styles.upArrow
                    : styles.downArrow
                }`}
              />
            </strong>
            {settingAtom.isLeftTab.communities && (
              <div className={styles.button}>
                <FiPlus />
                커뮤니티 생성
              </div>
            )}
            {settingAtom.isLeftTab.communities &&
              data &&
              data.map((v: Communities) => {
                return (
                  <div
                    key={v.id}
                    className={styles.button}
                    onClick={() => handleLocation(v.slug)}
                  >
                    /{v.slug}
                  </div>
                );
              })}
          </section>
        </>
      )}
    </section>
  );
};

export default LeftSide;
