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

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            className="flex gap-2"
            href={room.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project {room.githubRepo}
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className=" min-h screen p-16 container">
      <section className="flex justify-between">
        <div className="text-3xl mb-6">Find Rooms</div>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </section>
      <div className="grid grid-cols-3 gap-2">
        {rooms.map((roomItem) => {
          return <RoomCard key={roomItem.id} room={roomItem} />;
        })}
      </div>
    </main>
  );
}
