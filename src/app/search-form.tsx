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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { getRooms } from "@/services/room";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push("/?search=" + values.search);
    } else {
      router.push("/");
    }
  }
  const search = query.get("search");
  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[440px]  mr-4"
                  {...field}
                  placeholder=" Filter by keyword by using typescript, javascript"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="flex items-center mr-1 w-4 h-4" />
          Search
        </Button>

        <Button
          onClick={() => {
            form.setValue("search", "");
          }}
          className="ml-4"
          variant={"outline"}
        >
          Clear
        </Button>
      </form>
    </Form>
  );
}
