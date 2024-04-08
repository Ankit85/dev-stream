import { getRoom } from "@/services/room";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DevStreamVideoPlayer } from "./video-player";
import TagList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) return <div>No room found with id</div>;
  return (
    <div className=" ">
      <div className=" grid grid-cols-4   min-h-screen">
        <div className="col-span-3 p-4  pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            Video Screen
            <DevStreamVideoPlayer room={room} />
          </div>
        </div>
        <div className="col-span-1 p-4   pl-2">
          <div className="rounded-lg  border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4 ">
            <h1 className="text-base font-bold">{room.name}</h1>
            <h1 className="text-base text-gray-600">{room.description}</h1>
            {room.githubRepo && (
              <Link
                className="flex items-center gap-2 text-sm"
                href={room.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                Github Project
              </Link>
            )}

            <TagList tags={splitTags(room.tags)} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
