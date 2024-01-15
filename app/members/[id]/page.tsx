import prisma from "@/prisma/client";
import { Box, Button, Grid } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditNoteButton from "./EditNoteButton";
import NoteDetails from "./NoteDetails";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const note = await prisma.note.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!note) notFound();

  const member = await prisma.member.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!member) notFound();

  return (
    <>
      <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
        <h1>Member detailed notes</h1>
        <Grid columns={{ initial: "1", md: "2" }} gap="5" mb="5">
          <Box>
            <NoteDetails note={note} />
          </Box>
        </Grid>
        <div>
          <EditNoteButton noteId={note.id} />
        </div>
        <div>
          <Button className="">
            <Link href="/members">All Members</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
export const dynamic = "force-dynamic";
