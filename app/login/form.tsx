"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flex, TextField, Button, Card } from "@radix-ui/themes";
import Link from "next/link";
import Spinner from "../components/Spinner";

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.error) {
      {
        setSubmitting(false);
        setError("Invalid email/password or account doesn't exist.");
      }
    }
  };
  return (
    <Card className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl text-center mb-4 bg-blue-50 p-5 rounded-lg">
        Login to your Account
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className=" pb-4">
          <div className="border-">
            <label className="block mb-1">Email</label>
          </div>
          <TextField.Input
            name="email"
            type="email"
            radius="full"
            placeholder="enter email..."
            required={true}
          />
        </div>
        <div className="pb-4">
          <label className="block mb-1">Password</label>
          <TextField.Input
            name="password"
            type="password"
            radius="full"
            placeholder="enter password…"
            required={true}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center">
          <Button
            disabled={isSubmitting}
            color="orange"
            radius="full"
            size="2"
            variant="soft"
            type="submit"
            className="hover:cursor-pointer"
          >
            Login {isSubmitting && <Spinner />}
          </Button>
          <p className="my-2">-or-</p>
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
      </form>
    </Card>
  );
}
