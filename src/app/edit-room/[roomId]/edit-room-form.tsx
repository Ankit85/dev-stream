"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { editRoomAction } from "./actions";
import { Room } from "@/db/schema";

import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  githubRepo: z.string().min(2).max(50),
  tags: z.string().min(2).max(50),
});

export function EditRoomForm({ roomData }: { roomData: Room }) {
  const params = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: roomData.name,
      description: roomData.description ?? "",
      githubRepo: roomData.githubRepo ?? "",
      tags: roomData.tags,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    });
    toast({
      title: "Room edited",
      description: "Your room has been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your public Room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GithubRepo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/Ankit85/dev-stream/"
                />
              </FormControl>
              <FormDescription>
                Paste your GithubRepo you will be working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript,Drizzle,Nextjs" />
              </FormControl>
              <FormDescription>
                Enter Tags so that other devs can find room using tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
