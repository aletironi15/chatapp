"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: User) {
  const supabase = await createClient();

  const credentials = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        username: credentials.username,
      },
    },
  });
  if (error) {
    return { user: null, status: error.message };
  } else if (data.user?.identities?.length === 0) {
    return {
      status: "User with this email already exists, please login",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { user: data.user, status: "success" };
}

export async function signIn(formData: User) {
  const supabase = await createClient();

  const credentials = {
    email: formData.email,
    password: formData.password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { user: null, status: error.message };
  }

  const { data: existingUser } = await supabase
    .from("user_profile")
    .select("*")
    .eq("email", formData.email)
    .limit(1)
    .single();

  if (!existingUser) {
    console.log("entro ? ");
    const { error: insertError } = await supabase.from("user_profile").insert({
      firstName: data.user.user_metadata.firstName,
      username: data.user.user_metadata.username,
      lastName: data.user.user_metadata.lastName,
      email: data.user.email,
    });

    if (insertError) {
      return { user: null, status: insertError.message };
    }
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function isUserOnline() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { user: null, status: error.message };
  }
  return { user: data.user, status: "success" };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgotPassword(formData: string) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(formData, {
    redirectTo: `${origin}/reset-password`,
  });
  if (error) {
    return { status: error.message };
  }

  return { status: "success" };
}

export async function resetPassword(formData: string, code: string) {
  const supabase = await createClient();

  const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);
  if (CodeError) {
    return { status: CodeError.message };
  }

  const { error } = await supabase.auth.updateUser({
    password: formData,
  });
  if (error) {
    return { status: error.message };
  }
  return { status: "success" };
}
