import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/room";
import TagList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { SearchBar } from "./search-form";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-wrap">
        <TagList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            className="flex gap-2"
            href={room.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const rooms = await getRooms(searchParams.search);

  return (
    <main className=" min-h screen  container">
      <section className="pt-12 ">
        <div className="flex justify-between">
          {" "}
          <div className="text-3xl mb-6">Find Rooms</div>
          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
        <div className="flex items-center mb-8">
          <SearchBar />
        </div>
      </section>
      {rooms.length < 0 && <>No room</>}
      <div className="grid grid-cols-3 gap-2">
        {rooms.map((roomItem) => {
          return <RoomCard key={roomItem.id} room={roomItem} />;
        })}
      </div>
    </main>
  );
}
