"use client";
import { useState } from "react";
import FormButton from "../Buttons/FormButton";
import { forgotPassword } from "@/lib/actions/auth";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    if (res.status === "success") {
      alert("Passowrd reset link sent to your email");
    } else {
      alert("Something went wrong, please try again");
    }
    setLoading(false);
  };

  return (
    <div className="h-fit border-2 w-110 border-[rgba(255,255,255,0.15)] rounded-md p-4">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-bold">
          Recover your <span className="text-primary ">password</span>
        </h1>
        <p className="text-[rgba(255,255,255,0.7)]">
          Insert your email and follow the instructions
        </p>
      </div>

      <form
        className="flex flex-col gap-2 h-fit mt-2"
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
            value={email}
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
