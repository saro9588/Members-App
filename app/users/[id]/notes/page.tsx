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
    // const res = await fetch("/api/users");
    // const notes = await res.json();
    // console.log(notes);
    // const newestNote = notes.slice(-1)[0];
    // if (newestNote && newestNote.id) {
    //   router.push(`/users/${newestNote.id}/notes`);
    // } else {
    //   console.error("Latest user data or ID not found in response");
    // }
  });
  console.log(id);
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
