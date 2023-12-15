"use client";
import { Button } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import { useRouter } from "next/navigation";

interface Props {
  params: { id: number };
}

const MemberNoteForm = ({ params }: Props) => {
  const router = useRouter();
  interface MemberNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberNote>({});

  const { id } = params;
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: newNote } = await axios.post(`/api/members/${id}/`, data);
      router.push(`/members/${newNote.id}/`);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <p>Student Details</p>
      <form className="max-w-xl" onSubmit={onSubmit}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeEditor placeholder="notes..." {...field} />
          )}
        />
        <Button className="" type="submit">
          Submit
        </Button>
      </form>
      <Button>Test</Button>
    </>
  );
};
//export const dynamic = "force-dynamic";
export const revalidate = 0;
export default MemberNoteForm;
