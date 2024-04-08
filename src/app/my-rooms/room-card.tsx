"use client";
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
import { GithubIcon, Edit2Icon } from "lucide-react";
import TagList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";

export default function MyRoomCard({ room }: { room: Room }) {
  const { toast } = useToast();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{room.name}</CardTitle>
          <Link href={`/edit-room/${room.id}`}>
            <Edit2Icon className="w-4 h-4" />
          </Link>
        </div>

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
      <CardFooter className="flex gap-4">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete Room</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete room
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deleteRoomAction(room.id);
                  toast({
                    title: "Room Delete",
                    description: `Your room ${room.name} has been delete.`,
                  });
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
