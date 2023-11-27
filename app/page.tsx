"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function Home() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  // firstName and lastName will have correct type
  return (
    <>
      <div> New Entry</div>
      <form className="max-w-xl space-y-3 mb-5" onSubmit={onSubmit}>
        <TextField.Input
          {...register("firstName", {
            required: true,
          })}
          placeholder="firstname"
        />
        <TextField.Input
          {...register("lastName", { required: true })}
          placeholder="lastname"
        />
        <Button type="submit">Submit</Button>
      </form>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
}
