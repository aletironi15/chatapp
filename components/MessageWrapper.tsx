"use client";

import React, { useEffect, useState } from "react";
import Message from "./Message";
import { getMessages } from "@/lib/actions/dbOperations";
import { createClient } from "@/lib/supabase/client";
import { isUserOnline } from "@/lib/actions/auth";

export default function MessageWrapper() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>();
  const [username, setUsername] = useState<string>("");

  const fetchUserInfo = async () => {
    const res = await isUserOnline();
    if (res.status !== "success") {
      alert(res.status);
      return;
    }

    return res.user?.user_metadata.username;
  };

  const fetchMessages = async () => {
    const res = await getMessages();
    if (res.status === "error") {
      alert("Something went wrong, please try again");
      return;
    }

    if (!res.messages || res.messages.length === 0) {
      setMessages([
        {
          id: 1,
          author: "No messages at the moment",
          content: "Write your first message",
          created_at: new Date().toDateString(),
          user_id:
            "user_non_possibile_ashfjahhjgwefuiaewfuyafuiabefuaewluifesvai",
        },
      ]);
    } else {
      setMessages(res.messages);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUserInfo().then((res) => {
      if (res) {
        setUsername(res);
      }
    });

    const realtimeMessages = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtimeMessages);
    };
  }, []);

  return (
    <div className=" flex-1 flex flex-col p-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="space-y-5">
        {messages?.map((message) => {
          return (
            <Message message={message} key={message.id} username={username} />
          );
        })}
      </div>
    </div>
  );
}
