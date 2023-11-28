"use client";
import Link from "next/link";
import { Button, TextField } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
      <Button className="">
        <Link href="/users/new">Create User</Link>
      </Button>
    </>
  );
}
