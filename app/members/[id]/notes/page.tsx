"use client";
import { Button } from "@radix-ui/themes";
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

const createMemberNote = ({ params }: Props) => {
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
    await axios.post(`/api/members/${id}/`, data);
    reset();
    const res = await fetch("/api/members");
    const members = await res.json();
    console.log(members);
    const newestMember = members.slice(-1)[0];
    const newestNote = newestMember?.notes?.[0];
    console.log(newestNote);
    const newestNoteId = newestNote.id;
    if (newestNote && newestNoteId) {
      router.push(`/members/${newestNoteId}/`);
    } else {
      console.error("Latest member note or ID not found in response");
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default createMemberNote;
