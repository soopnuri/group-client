"use client";

import * as styles from "./styles.css";
import { Divider } from "../Divider/Divider";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
const Login = () => {
  const { handleSubmit, register } = useForm();
  const useNavigate = useRouter();

  const handleLogin = (data: any) => {
    console.log(data);
  };
  const handleGoogleLogin = () => {

    useNavigate.push(`${process.env.NEXT_PUBLIC_NEST_ENDPOINT}/auths/google`);
  };

  return (
    <div>
      <div onClick={handleGoogleLogin}>
        <FcGoogle />
        구글 로그인
      </div>
    </div>
  );
};

export default Login;
