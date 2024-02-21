"use client";
import { Button, TextArea } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateNoteForm = ({ id }: { id: number }) => {
  const router = useRouter();

  interface MemberNote {
    id: number;
    description: string;
    authorId: number;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberNote>({});

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: note } = await axios.post(`/api/members/${id}/`, data, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      router.push("/members/" + note.id);
      console.log(note);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div>
      <form className="max-w-xl" onSubmit={onSubmit}>
        <TextArea
          {...register("description", { required: "This is required." })}
          placeholder="Take notes..."
        />
        <Button color="indigo" variant="soft" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};
export const revalidate = 0;
export const dynamic = "force-dynamic";
export default CreateNoteForm;
