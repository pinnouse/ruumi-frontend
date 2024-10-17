"use client";
import { Tables } from "@/app/lib/supabase/database.types";
import { createRoom } from "@/app/lib/room/createRoom";

export default function EpisodeCard(props: {
  episode_data: Tables<"anime_episodes">;
}) {
  const { episode_data: episode } = props;
  return (
    <button
      onClick={() => createRoom(episode)}
      className="rounded-md transition ring-2 ring-white mt-6 mx-3 w-16 h-12 p-3 text-center hover:bg-white hover:text-black"
    >
      {episode.episode_number.toString().padStart(2, "0")}
    </button>
  );
}
