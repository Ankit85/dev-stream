"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { deleteAccountAction } from "./actions";

function Account() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and any data asscoiated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
                toast({
                  title: "Your Account is deleted",
                  description:
                    "Your Account and any data associated with is deleted.",
                });
              }}
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Avatar className="mr-2  ">
              <AvatarImage src={session.data?.user.image ?? ""} />
              <AvatarFallback>{session.data?.user.name}</AvatarFallback>
            </Avatar>
            <h2> {session.data?.user.name}</h2>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            Sign Out
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export function Header() {
  const session = useSession();

  const isLoggedIn = !!session.data;

  return (
    <header className="bg-slate-100 dark:bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between gap-4 items-center">
        <Link href="/" className="text-xl flex gap-4 items-center">
          <svg
            height={40}
            width={40}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              d="M10.5 23.5V43a2.6 2.6 0 0 0 4 2.11l31.64-19.89a2 2 0 0 0 1-1.72z"
              fill="#bc1948"
            />
            <path
              d="M10.5 23.5V4a2.6 2.6 0 0 1 4-2.11l31.64 19.89a2 2 0 0 1 1 1.72z"
              fill="#e8467c"
            />
            <path
              d="M4.39 11.11L21 22.29a1.47 1.47 0 0 1 0 2.42L4.39 35.89a1.39 1.39 0 0 1-2.14-1.21V12.32a1.39 1.39 0 0 1 2.14-1.21"
              fill="#8c193f"
            />
          </svg>
          <h1>Dev Stream</h1>
        </Link>
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Link className="underline " href="/my-rooms">
              My Rooms
            </Link>
          )}
          {!isLoggedIn && (
            <Button
              onClick={() => {
                signIn("google");
              }}
            >
              Sign In
            </Button>
          )}
          {isLoggedIn && <Account />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
