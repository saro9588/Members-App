"use client";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>
        This App is for adding members and crearting notes unique to each member
      </p>
      <Button className="">
        <Link href="/members">All Members</Link>
      </Button>
      <Button className="">
        <Link href="/members/new">Add Member</Link>
      </Button>
    </>
  );
}
