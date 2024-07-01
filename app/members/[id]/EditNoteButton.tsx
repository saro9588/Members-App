import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditNoteButton = ({ noteId }: { noteId: string }) => {
  return (
    <Button>
      <Link href={`/members/${noteId}/edit`}>
        <FaEdit />
      </Link>
    </Button>
  );
};

export default EditNoteButton;
