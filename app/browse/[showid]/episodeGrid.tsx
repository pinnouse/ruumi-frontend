"use client";
import { Tables } from "@/app/lib/supabase/database.types";
import { createRoom } from "@/app/lib/room/createRoom";
import Image from "next/image";

function EpisodeCard(props: { episode_data: Tables<"anime_episodes"> }) {
  const { episode_data: episode } = props;
  return (
    <button
      onClick={() => createRoom(episode)}
      className="rounded-md transition ring-2 ring-white mt-6 mx-3 w-72 h-40 text-center hover:bg-white hover:text-black block"
    >
      <Image src="/play-thumbnail.svg" alt="play" width={72} height={48} />
      {episode.episode_number.toString().padStart(2, "0")}
    </button>
  );
}

export default function EpisodeGrid({
  episodes,
}: {
  episodes: Tables<"anime_episodes">[];
}) {
  return (
    <div className="flex flex-wrap">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode_data={episode} />
      ))}
      {episodes.length === 0 && <i>No episodes found.</i>}
    </div>
  );
}
