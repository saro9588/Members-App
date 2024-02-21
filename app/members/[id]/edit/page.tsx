"use client";
import React from "react";
import { Button, TextArea } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

const EditNoteForm = ({ note }: { note: Note }) => {
  const router = useRouter();

  interface NoteFormData {
    description: string;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({});

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: newNote } = await axios.post(
        `/api/members/${note.id}/`,
        data,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      router.push(`/members/${newNote.id}/`);
      console.log(newNote.id);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      <form className="max-w-xl" onSubmit={onSubmit}>
        <TextArea
          {...register("description", { required: "This is required." })}
          placeholder="Edit this note..."
          defaultValue={note.description}
        />
        <Button color="indigo" variant="soft" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};
// export const revalidate = 0;
// export const dynamic = "force-dynamic";
export default EditNoteForm;

// import React from "react";

// const EditNotePage = () => {
//   return (
//     <div className="grid grid-col-1 mx-auto max-w-screen-lg gap-2">
//       <p>Page coming soon...</p>
//     </div>
//   );
// };

// export default EditNotePage;
