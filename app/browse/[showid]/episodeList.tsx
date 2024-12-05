"use client";
import { Tables } from "@/app/lib/supabase/database.types";
import { createRoom } from "@/app/lib/room/createRoom";
import { PlayIcon } from "@heroicons/react/16/solid";

function EpisodeItem(props: { episode_data: Tables<"anime_episodes"> }) {
  const { episode_data: episode } = props;
  return (
    <button
      onClick={() => createRoom(episode)}
      className="transition duration-150 p-2 block w-full text-left hover:bg-teal-600/30 rounded-lg text-gray-300"
    >
      <PlayIcon className="inline h-4 w-4 mr-2" />
      Play episode&nbsp;
      {episode.episode_number.toString().padStart(2, "0")}
    </button>
  );
}

export default function EpisodeList({
  episodes,
}: {
  episodes: Tables<"anime_episodes">[];
}) {
  return (
    <div className="text-left mt-3">
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode_data={episode} />
      ))}
      {episodes.length === 0 && <i>No episodes found.</i>}
    </div>
  );
}
