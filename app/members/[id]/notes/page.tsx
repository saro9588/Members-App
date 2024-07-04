import "easymde/dist/easymde.min.css";
import NoteForm from "../../_components/NoteForm";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}
const MemberNoteForm = async ({ params }: Props) => {
  const member = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
        <h1 style={{ fontWeight: "bold" }}>Member {member?.firstname} Notes</h1>
        <NoteForm
          id={params.id}
          note={{
            id: "",
            description: "",
            authorId: "",
            createdBy: "",
          }}
        />
      </div>
    </>
  );
};
export const revalidate = 0;
export const dynamic = "force-dynamic";
export default MemberNoteForm;
