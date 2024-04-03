import { db } from "@/db";

export default async function Home() {
  const items = await db.query.testing.findMany();
  return (
    <div>
      {items.map((item) => {
        return <div key={item.id}>{item.fullName}</div>;
      })}
    </div>
  );
}
