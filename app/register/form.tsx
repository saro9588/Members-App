"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, TextField } from "@radix-ui/themes";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!response?.ok) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md"
      >
        <h1 className="text-xl">Register an Account</h1>
        <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
          <label>Email</label>
          <TextField.Input
            name="email"
            type="email"
            radius="full"
            placeholder="enter email..."
          />
          <label>Password</label>
          <TextField.Input
            name="password"
            type="password"
            radius="full"
            placeholder="enter password…"
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </>
  );
}
