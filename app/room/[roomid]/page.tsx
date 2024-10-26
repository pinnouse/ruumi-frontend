"use server";

import { validateRoom } from "@/app/lib/room/validateRoom";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import DeleteRoomButton from "./deleteRoomButton";
import Player from "@/app/room/[roomid]/player"
import { getUser } from "@/app/lib/auth";

type Params = Promise<{roomid: string}>;

export default async function RoomPage(props: { params: Params }) {
  const params = await props.params;
  const user = await getUser();
  const roomData = await validateRoom(params.roomid);
  const authed = roomData.created_by == user.id;
  const meta = roomData.meta!;
  const episodeNumber = meta.episode_number.toString().padStart(2, "0");
  return (
    <div>
      <h1 className="text-2xl">
        You're watching <b>{meta.anime!.title}</b>
      </h1>
      <h2>Episode {episodeNumber}</h2>
      <br />
      <Player roomData={roomData} meta={meta} userID={user.id} />
      { authed && <DeleteRoomButton /> }
    </div>
  );
}
