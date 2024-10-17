import { validateRoom } from "@/app/lib/room/validateRoom";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import DeleteRoomButton from "./deleteRoomButton";

export default async function RoomPage({
  params,
}: {
  params: { roomid: string };
}) {
  const roomData = await validateRoom(params.roomid);
  const meta = roomData.meta!;
  const episodeNumber = meta.episode_number.toString().padStart(2, "0");
  return (
    <div>
      <h1 className="text-2xl">
        You're watching <b>{meta.anime!.title}</b>
      </h1>
      <h2>Episode {episodeNumber}</h2>
      <br />
      <MediaPlayer
        title={`${meta.anime!.title} - ${episodeNumber}`}
        src={roomData.video_url}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
      <DeleteRoomButton />
    </div>
  );
}
