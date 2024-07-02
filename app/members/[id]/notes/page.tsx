import "easymde/dist/easymde.min.css";
import NoteForm from "../../_components/NoteForm";
interface Props {
  params: { id: string };
}
const MemberNoteForm = ({ params }: Props) => {
  return (
    <>
      <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
        <h1 style={{ fontWeight: "bold" }}>Member Notes</h1>
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
