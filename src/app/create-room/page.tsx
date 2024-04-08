import React from "react";
import { CreateRoomForm } from "./create-room-form";

export default function page() {
  return (
    <div className=" pt-16 pb-24 flex flex-col gap-8 px-24">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
