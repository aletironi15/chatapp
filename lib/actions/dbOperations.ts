"use server";

import { createClient } from "../supabase/server";

export async function getMessages() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id");
  if (error) {
    return { status: "error", messages: null };
  }
  if (data == null) {
    return { status: "null-obj", messages: null };
  }

  return { status: "success", messages: data };
}

export async function insertMessage(message: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { status: error.message };
  }

  const { error: insertError } = await supabase.from("messages").insert({
    author: data.user?.user_metadata.username,
    content: message,
  });

  if (insertError) {
    return { status: insertError.message };
  }

  return { status: "success" };
}

export async function deleteMessage(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { status: "Error occurred, we're sorry" };
  }
  const { id: uuid } = data.user;

  const { data: message, error: messageError } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (messageError) {
    return { status: "Error occurred, we're sorry" };
  }

  const { user_id: message_user_id } = message;

  if (uuid !== message_user_id) {
    return { status: "Unauthorized: cannot delete this message" };
  }

  const { error: deleteError } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return { status: "Error during deletion" };
  }

  return { status: "success" };
}

export default async function updateMessage(id: number, content: string) {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return { status: "User not authenticated" };
  }

  const user_id = userData.user.id;

  const { error: updateError } = await supabase
    .from("messages")
    .update({ content })
    .eq("id", id)
    .eq("user_id", user_id);

  if (updateError) {
    return { status: "Error during update" };
  }

  return { status: "success" };
}
