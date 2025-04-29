"use client";

import { isUserOnline, signOut } from "@/lib/actions/auth";
import SignoutButton from "./Buttons/SignoutButton";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChatHeader() {
  const [loading, setLoading] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  const supabase = createClient();
  const fetchOnlineUsers = async () => {
    const res = await isUserOnline();
    if (res.status !== "success") {
      return;
    }
    return res.user?.id;
  };
  useEffect(() => {
    const channel = supabase.channel("tracking");

    channel
      .on("presence", { event: "sync" }, () => {
        const userIDs: string[] = [];
        for (const id in channel.presenceState()) {
          //@ts-expect-error description of error
          userIDs.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers([...new Set(userIDs)].length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: await fetchOnlineUsers(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await signOut();
  };
  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
            <h1 className="text-sm text-gray-400">
              {onlineUsers} Online users
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {loading ? (
            <SignoutButton btnType="Loading..." loading={loading} />
          ) : (
            <SignoutButton btnType="Sign Out" loading={loading} />
          )}
        </form>
      </div>
    </div>
  );
}
