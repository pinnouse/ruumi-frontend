"use client";

import { useParams } from "next/navigation";
import { deleteRoom } from "@/app/room/[roomid]/deleteRoom";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function DeleteRoomButton() {
  const params = useParams<{ roomid: string }>();
  return (
    <button
      onClick={() => deleteRoom(params.roomid)}
      className="rounded-md transition mt-6 p-3 text-center bg-red-600 hover:bg-white hover:text-black"
    >
      Destroy Room <XMarkIcon className="inline h-5 w-5" />
    </button>
  );
}
