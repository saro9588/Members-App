import { Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import CreateNoteForm from "./CreateNoteForm";
interface Props {
  params: { id: number };
}
const MemberNoteForm = ({ params }: Props) => {
  return (
    <>
      <p>Student Details</p>
      <CreateNoteForm id={params.id} />
      <Button>Test</Button>
    </>
  );
};
//export const dynamic = "force-dynamic";
export const revalidate = 0;
export default MemberNoteForm;
