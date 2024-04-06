import { Badge } from "./ui/badge";

export function splitTags(tags: string) {
  return tags?.split(",").map((tag) => tag.trim());
}

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => {
        return <Badge key={tag}>{tag}</Badge>;
      })}
    </div>
  );
}
