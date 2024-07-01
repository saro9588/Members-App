import NoteForm from "../../_components/NoteForm";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const EditNotePage = async ({ params }: Props) => {
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
    <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
      <NoteForm id={params.id} note={note} />
    </div>
  );
};

export default EditNotePage;
