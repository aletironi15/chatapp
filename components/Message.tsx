import updateMessage, { deleteMessage } from "@/lib/actions/dbOperations";
import React from "react";
import { useState } from "react";

export default function Message(props: { message: Message; username: string }) {
  const [update, setUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(props.message.content);
  const handleDelete = async () => {
    const res = await deleteMessage(props.message.id);
    if (res?.status !== "success") {
      alert(res?.status);
      return;
    }
    return;
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateMessage(props.message.id, message);
    if (res.status !== "success") {
      alert(res.status);
      setUpdate(false);
      return;
    }
    setUpdate(false);
    return;
  };

  return (
    <div className="flex gap-2 items-center">
      <div
        className={`${
          props.username === props.message.author
            ? "bg-green-500"
            : "bg-cyan-500"
        } h-10 w-10 rounded-full`}
      ></div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">{props.message.author}</h1>
          <h1 className="text-sm text-gray-400">
            {props.message.created_at.slice(0, 10)}
          </h1>
        </div>
        {update ? (
          <form onSubmit={handleSubmit}>
            <input
              className="w-full bg-[rgba(255,255,255,0.15)] rounded-sm px-2 outline-none"
              type="text"
              value={message}
              placeholder="Edit your message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        ) : (
          <p className="text-gray-300">{props.message.content}</p>
        )}
      </div>
      {props.username === props.message.author && (
        <div className="flex self-start gap-2">
          <div className="text-xl cursor-pointer" onClick={handleUpdate}>
            {update ? "✅" : "✏️"}
          </div>
          <div className="text-xl cursor-pointer" onClick={handleDelete}>
            ✖️
          </div>
        </div>
      )}
    </div>
  );
}
