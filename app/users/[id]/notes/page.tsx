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

const createUserNote = ({ params }: Props) => {
  const router = useRouter();
  interface UserNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNote>({});

  const { id } = params;
  const onSubmit = handleSubmit(async (data) => {
    await axios.post(`/api/users/${id}/`, data);
    reset();
    const res = await fetch("/api/users");
    const users = await res.json();
    console.log(users);
    const newestUser = users.slice(-1)[0];
    const newestNote = newestUser?.notes?.[0];
    console.log(newestNote);
    const newestNoteId = newestNote.id;
    if (newestNote && newestNoteId) {
      router.push(`/users/${newestNoteId}/`);
    } else {
      console.error("Latest user note or ID not found in response");
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

export default createUserNote;
