import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { Button } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const note = await prisma.note.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!note) notFound();

  return (
    <>
      <h1>Member detailed notes</h1>
      <div>
        <p>{note.authorId}</p>
        <p>{note.description}</p>
        <p>{note.id}</p>
      </div>
      <Button className="">
        <Link href="/users">All Users</Link>
      </Button>
    </>
  );
}
