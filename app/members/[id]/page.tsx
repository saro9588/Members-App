import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import "easymde/dist/easymde.min.css";
import { Button, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

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
        <Card className="prose max-w-full" mt="4">
          <ReactMarkdown>{note.description}</ReactMarkdown>
        </Card>
        {/* <p>{note.authorId}</p>
        <p>{note.description}</p>
        <p>{note.id}</p> */}
      </div>
      <Button className="">
        <Link href="/members">All Members</Link>
      </Button>
    </>
  );
}
