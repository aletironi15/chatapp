"use client";

import React from "react";
import { useState } from "react";
import { insertMessage } from "@/lib/actions/dbOperations";

export default function CreateMessage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      message === undefined ||
      message == null ||
      message == "" ||
      message.trim() === ""
    ) {
      alert("Please enter a message");
      setLoading(false);
      return;
    }
    const res = await insertMessage(message);
    if (res.status !== "success") {
      alert(res.status);
      setLoading(false);
      return;
    }
    setMessage("");
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border-border border-2 rounded-sm bg-[rgba(255,255,255,0.04)] p-2.5 text-sm placeholder:text-[rgba(255,255,255,0.5)] focus:border-primary h-10 outline-none transition-all ease-in-out duration-300 absolute left-0 top-1/2 transform -translate-y-1/2"
        placeholder="send message "
        value={message}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={`${
          loading ? "bg-gray-400" : "bg-primary"
        } absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-r-sm text-sm cursor-pointer font-bold transition-all ease-in-out duration-300 `}
      >
        &rarr;
      </button>
    </form>
  );
}
