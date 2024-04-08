import React from "react";
import { EditRoomForm } from "./edit-room-form";
import { getRoom, getUserRooms } from "@/services/room";

export default async function page({ params }: { params: { roomId: string } }) {
  const room = await getRoom(params.roomId);

  if (!room) return;
  return (
    <div className=" pt-16 pb-24 flex flex-col gap-8 px-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm roomData={room} />
    </div>
  );
}
