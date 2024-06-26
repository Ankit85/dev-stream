import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/room";
import { SearchBar } from "./search-form";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const rooms = await getRooms(searchParams.search);

  return (
    <div className=" min-h-screen ">
      <section className="pt-12 ">
        <div className="flex justify-between">
          <div className="text-3xl mb-6">Find Rooms</div>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
        <div className="flex items-center mb-8">
          <SearchBar />
        </div>
      </section>
      <section className="grid grid-cols-3 gap-2">
        {rooms.map((roomItem) => {
          return <RoomCard key={roomItem.id} room={roomItem} />;
        })}
      </section>
      <section>
        {rooms.length == 0 && (
          <div className=" p-24 flex flex-col justify-center items-center gap-4  ">
            <Image
              width={150}
              height={150}
              alt="no data found"
              src="/no_data.svg"
            />
            <h2 className=" text-center">No room found.</h2>
          </div>
        )}
      </section>
    </div>
  );
}
