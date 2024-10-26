"use server";

import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteRoom(roomid: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("rooms").delete().eq("id", roomid);
  if (error) {
    throw error;
  }
  redirect("/browse");
}
