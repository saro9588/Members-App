"use client";
import { TextField, TextFieldInput } from "@radix-ui/themes";
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
interface UserForm {
  id: number;
  firstName: string;
  lastName: string;
  info: string;
  notes: Note[];
}
interface Note {
  id: number;
  author: string;
  authorId: number;
  description: string;
}
export default function Page({ params }: { params: { slug: string } }) {
  const [users, setUsers] = useState<UserForm[]>([]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({});
  const onSubmit = handleSubmit(async (data) => {
    await axios.post("/api/users/", data);
    reset();
  });
  return (
    <>
      <h1>User detailed notes</h1>

      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <TextField.Input
          {...register("notes", {
            required: "This is required.",
          })}
          placeholder="firstname"
        />
        <Button type="submit">Save</Button>
      </form>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
}
