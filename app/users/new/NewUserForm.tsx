"use client";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { Button, TextField, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NewUser = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  interface UserForm {
    id: number;
    firstName: string;
    lastName: string;
    info: string;
  }
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({});
  const onSubmit = handleSubmit(async (data) => {
    await axios.post("/api/users/", data);
    const res = await fetch("/api/users");
    const users = await res.json();
    console.log(users);
    const newestUser = users.slice(-1)[0];
    if (newestUser && newestUser.id) {
      router.push(`/users/${newestUser.id}/notes`);
    } else {
      console.error("Latest user data or ID not found in response");
    }
  });

  console.log();
  return (
    <>
      <div>Create a New User</div>
      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <TextField.Input
          {...register("firstName", {
            required: "This is required.",
          })}
          placeholder="firstname"
        />
        <p>{errors.firstName?.message}</p>
        <TextField.Input
          {...register("lastName", { required: "This is required." })}
          placeholder="lastname"
        />
        <p>{errors.lastName?.message}</p>

        <TextArea
          {...register("info", {
            required: "This is required.",
          })}
          placeholder="Notes..."
        />
        <p>{errors.info?.message}</p>
        <Button type="submit">Create User</Button>
      </form>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
};

export default NewUser;
