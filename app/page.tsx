"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TextField } from "@radix-ui/themes";

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
      <div> Hello World</div>
      <form className="max-w-xl space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="firstname" />
          <TextField.Input placeholder="lastname" />
        </TextField.Root>
      </form>
      <Link href="/users">Click Me</Link>
    </>
  );
}
