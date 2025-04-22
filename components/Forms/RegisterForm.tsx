"use client";
import { useState } from "react";
import FormButton from "../Buttons/FormButton";
import { signUp } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signUp(registerData);
    if (res.status !== "success") {
      alert(res.status);
      setLoading(false);
      return;
    }
    router.push("/login");
  };

  return (
    <div className="h-fit border-2 w-110 border-[rgba(255,255,255,0.15)] rounded-md p-4">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-bold">
          Welcome to our <span className="text-primary ">ChatApp</span>
        </h1>
        <p className="text-[rgba(255,255,255,0.7)]">
          Register and enjoy our service
        </p>
      </div>

      <form
        className="flex flex-col gap-2 h-fit"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full ">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="Thomas"
            value={registerData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="Gray"
            value={registerData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="thomGray62"
            value={registerData.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="thomasgray@example.com"
            value={registerData.email}
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
            value={registerData.password}
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <FormButton loading={loading} btnType="Loading..." />
        ) : (
          <FormButton loading={loading} btnType="Sign Up" />
        )}
      </form>
      <div className="mt-3 w-full text-center mb-2">
        already have an account ?{" "}
        <Link className="underline font-bold" href="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
}
