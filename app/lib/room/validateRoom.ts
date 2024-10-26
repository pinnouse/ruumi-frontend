"use server";

import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import { deleteRoom } from "../../room/[roomid]/deleteRoom";

export async function validateRoom(roomID: string, password?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select(
      "*, meta:anime_episodes(episode_number, anime(id, title, poster_url))",
    )
    .eq("id", roomID)
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
  if (new Date() > new Date(data.expires_at)) {
    await deleteRoom(roomID);
  }
  return data;
}
