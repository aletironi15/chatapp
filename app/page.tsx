import React from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageWrapper from "@/components/MessageWrapper";
import CreateMessage from "@/components/Forms/CreateMessage";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md flex flex-col ">
        <ChatHeader />
        <MessageWrapper />

        <div className="relative h-10  mb-2">
          <CreateMessage />
        </div>
      </div>
    </div>
  );
}
