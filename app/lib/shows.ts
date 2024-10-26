"use server";

import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";

export async function listAllShows() {
  // TODO: Paginate this function
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("anime")
    .select("id,title,poster_url");
  if (error) {
    throw error;
  }
  return data;
}

export async function getShowById(id: string) {
  // TODO: Validate id is UUID
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("anime")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    // throw error;
    notFound();
  }
  return data;
}

export async function listShowEpisodes(id: string) {
  // TODO: Validate id is UUID
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("anime_episodes")
    .select("*")
    .eq("anime_id", id);
  if (error) {
    throw error;
  }
  return data;
}
