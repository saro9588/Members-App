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
  if (!note) notFound();

  const member = await prisma.member.findUnique({
    where: { id: note.authorId },
  });
  if (!member) notFound();
  if (note.authorId !== member.id && member.createdBy !== session?.user?.email)
    notFound();

  return (
    <div>
      <h1>Member detailed notes</h1>
      <Grid columns={{ initial: "1", md: "2" }} gap="5" mb="5">
        <Box>
          <NoteDetails note={note} />
        </Box>
        <Box>
          <EditNoteButton noteId={note.id} />
        </Box>
      </Grid>
      <Button>
        <Link href="/members">All Members</Link>
      </Button>
    </div>
  );
}
export const dynamic = "force-dynamic";
