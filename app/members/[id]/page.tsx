import prisma from "@/prisma/client";
import { Box, Button, Grid } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditNoteButton from "./EditNoteButton";
import NoteDetails from "./NoteDetails";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const session = await getServerSession();
  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });

  if (!note || note.createdBy !== session?.user?.email) notFound();

  const member = await prisma.member.findUnique({
    where: { id: note.authorId },
  });
  if (!member) notFound();

  return (
    <div className="mx-auto max-w-screen-lg gap-2">
      <h1 style={{ fontWeight: "bold" }}>Member notes</h1>
      <Box mb="5">
        <NoteDetails note={note} />
      </Box>
      <Box>
        <EditNoteButton noteId={note.id} />
      </Box>
    </div>
  );
}
export const dynamic = "force-dynamic";
