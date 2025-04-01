"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import * as styles from "./styles.css";
import { Divider } from "../Divider/Divider";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <section className={styles.loginBox}>
          <strong className={styles.title}>환영합니다</strong>
          <p>SNS 로그인</p>
          <Divider />
          <button className={styles.google} onClick={() => signIn()}>
            <FcGoogle />
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p>안녕하세요, {session?.user?.name}!</p>
      <button className={styles.google} onClick={() => signOut()}>
        로그아웃
      </button>
    </div>
  );
};

export default Login;
