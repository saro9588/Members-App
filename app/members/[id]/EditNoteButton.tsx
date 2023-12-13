import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditNoteButton = ({ noteId }: { noteId: number }) => {
  return (
    <Button>
      <Link href={`/members/${noteId}/edit`}>Edit Notes</Link>
    </Button>
  );
};

export default EditNoteButton;
