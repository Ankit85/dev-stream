import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/services/room";
import RoomCard from "@/components/RoomCard";
import MyRoomCard from "./room-card";
import Image from "next/image";

export default async function MyRoom() {
  const rooms = await getUserRooms();

  return (
    <main className="min-h screen  container">
      <section className="pt-12">
        <div className="flex justify-between">
          <div className="text-3xl mb-6">Find My Rooms</div>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      </section>
      {rooms.length < 0 && <>No room</>}
      <div className="grid grid-cols-3 gap-2 ">
        {rooms.map((roomItem) => {
          return <MyRoomCard key={roomItem.id} room={roomItem} />;
        })}
      </div>

      <div>
        {rooms.length == 0 && (
          <div className=" p-24 flex flex-col justify-center items-center gap-4  ">
            <Image
              width={150}
              height={150}
              alt="no data found"
              src="/no_data.svg"
            />
            <h2 className=" text-center">No room created yet.</h2>
          </div>
        )}
      </div>
    </main>
  );
}
