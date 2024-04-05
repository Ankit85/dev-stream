"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function Account() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
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
        {isLoggedIn ? (
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              signIn("google");
            }}
          >
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function Header() {
  return (
    <header className="bg-slate-100 container mx-auto dark:bg-slate-900 py-4">
      <div className="flex justify-between gap-4 items-center">
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
        <div className="flex item-center gap-2">
          <Account />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
