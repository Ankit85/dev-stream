"use client";
import { useRouter } from "next/navigation";
import { Badge, badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => {
        return (
          <button
            className={cn(badgeVariants())}
            key={tag}
            onClick={() => {
              router.push(`/?search=${tag}`);
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
