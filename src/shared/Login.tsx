"use client";

import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <p>로그인되지 않았습니다</p>
        <button onClick={() => signIn()}>로그인</button>
      </div>
    );
  }

  return (
    <div>
      <p>안녕하세요, {session?.user?.name}!</p>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Login;