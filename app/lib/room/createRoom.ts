"use server";

import { Tables } from "@/app/lib/supabase/database.types";
import { createClient } from "@/app/lib/supabase/server";
import { presignObject } from "@/app/lib/objectStore";
import { redirect } from "next/navigation";

export async function createRoom(episode: Tables<"anime_episodes">) {
  const url = await presignObject(episode.s3_key);
  if (!url) {
    throw new Error("Failed to generate presigned URL");
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("rooms")
    .insert({
      episode_id: episode.id,
      video_url: url,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  redirect(`/room/${data.id}`);
}
