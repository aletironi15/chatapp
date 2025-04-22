"use client";
import { useState } from "react";
import FormButton from "../Buttons/FormButton";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/actions/auth";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await resetPassword(
      password,
      searchParams.get("code") as string
    );

    if (res.status !== "success") {
      alert("Something went wrong, please try again");
      setLoading(false);
      return;
    } else {
      router.push("/");
    }
    alert("Password reset successfully");
    setLoading(false);
  };

  return (
    <div className="h-fit border-2 w-110 border-[rgba(255,255,255,0.15)] rounded-md p-4">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-bold">
          Choose your new <span className="text-primary ">password</span>
        </h1>
        <p className="text-[rgba(255,255,255,0.7)]">Insert your new password</p>
      </div>

      <form
        className="flex flex-col gap-2 h-fit mt-2"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full ">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-1 border-[rgba(255,255,255,0.3)] rounded-[6px] outline-none p-1 w-full"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <FormButton loading={loading} btnType="Loading..." />
        ) : (
          <FormButton loading={loading} btnType="Forgot Password" />
        )}
      </form>
    </div>
  );
}
