"use client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import dynamic from "next/dynamic";
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function Page({ params }: { params: { slug: string } }) {
  const [users, setUsers] = useState<UserForm[]>([]);
  interface UserForm {
    firstName: string;
    lastName: string;
    notes: string;
  }
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({});
  const onSubmit = handleSubmit(async (data) => {
    await axios.post("/api/users", data);
    reset();
  });
  return (
    <>
      <h1>User detailed notes</h1>
      <h2>
        {users.map((user) => (
          <h1>{user.firstName} Hello</h1>
        ))}
      </h2>

      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <SimpleMdeEditor placeholder="notes..." {...field} />
          )}
        />
        <p>{errors.notes?.message}</p>
        <Button type="submit">Save</Button>
      </form>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
}
