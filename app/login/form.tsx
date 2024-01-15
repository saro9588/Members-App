"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flex, TextField, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Form() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.error) {
      {
        setError("Invalid email/password.");
      }
    }
    router.push("/");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md"
    >
      <h1 className="text-xl">Login to your Account</h1>
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <label>Email</label>
        <TextField.Input
          name="email"
          type="email"
          radius="full"
          placeholder="enter email..."
          required={true}
        />
        <label>Password</label>
        <TextField.Input
          name="password"
          type="password"
          radius="full"
          placeholder="enter password…"
          required={true}
        />
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col justify-center items-center">
          <Button
            color="orange"
            radius="full"
            size="2"
            variant="soft"
            type="submit"
            className="hover:cursor-pointer"
          >
            Login
          </Button>
          <p>-or-</p>
          <Button
            color="orange"
            radius="full"
            size="2"
            variant="soft"
            type="submit"
            className="hover:cursor-pointer"
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </Flex>
    </form>
  );
}
