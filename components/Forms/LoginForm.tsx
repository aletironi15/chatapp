"use client";
import { useState } from "react";
import FormButton from "../Buttons/FormButton";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<User>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn(loginData);
    if (res.status !== "success") {
      alert(res.status);
      setLoading(false);

      return;
    }
    router.push("/");
  };

  return (
    <div className="h-fit border-2 w-110 border-[rgba(255,255,255,0.15)] rounded-md p-4">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-bold">
          Welcome Back <span className="text-primary ">Stranger</span>
        </h1>
        <p className="text-[rgba(255,255,255,0.7)]">
          Login and enjoy our service
        </p>
      </div>

      <form
        className="flex flex-col gap-2 h-fit"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full ">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="thomasgray@example.com"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <FormButton loading={loading} btnType="Loading..." />
        ) : (
          <FormButton loading={loading} btnType="Sign In" />
        )}
      </form>
      <div className="w-full text-center mt-3 ">
        Have you forgot your{" "}
        <Link className="underline font-bold" href="/forgot-password">
          password ?
        </Link>
      </div>
      <div className="mb-2 w-full text-center ">
        Do not have any account ?{" "}
        <Link className="underline font-bold" href="/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
