"use server";

import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";

export async function validateRoom(roomId: string, password?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select(
      "*, meta:anime_episodes(episode_number, anime(id, title, poster_url))",
    )
    .eq("id", roomId)
    .single();
  if (error) {
    notFound();
  }
  if (!data) {
    notFound();
  }
  if (data.password && data.password !== password) {
    notFound();
  }
  return data;
}
